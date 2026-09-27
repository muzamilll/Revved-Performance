const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Brevo expects phone numbers in international format, e.g. +447123456789.
function normalisePhone(raw: string): string | null {
  const digits = raw.replace(/[\s()-]/g, "");
  if (/^07\d{9}$/.test(digits)) return `+44${digits.slice(1)}`;
  if (/^\+?44\d{10}$/.test(digits)) return `+${digits.replace(/^\+/, "")}`;
  if (/^\+\d{10,15}$/.test(digits)) return digits;
  return null;
}

async function createContact(apiKey: string, listId: number, email: string, phone: string | null) {
  return fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      email,
      listIds: [listId],
      updateEnabled: true,
      ...(phone ? { attributes: { SMS: phone } } : {}),
    }),
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env.BREVO_LIST_ID);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return Response.json({ error: "Sign-up is coming soon." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot field: real visitors never fill it in.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (body.consent !== true) {
    return Response.json({ error: "Please tick the box to agree to hear from us." }, { status: 400 });
  }

  const rawPhone = typeof body.phone === "string" ? body.phone.trim() : "";
  const phone = rawPhone ? normalisePhone(rawPhone) : null;
  if (rawPhone && !phone) {
    return Response.json({ error: "Please enter a valid UK mobile number, or leave it blank." }, { status: 400 });
  }

  try {
    let res = await createContact(apiKey, listId, email, phone);
    // If Brevo rejects the phone number (e.g. already used by another contact), keep the email sign-up.
    if (res.status === 400 && phone) {
      console.error("Brevo rejected contact with phone, retrying without:", await res.text());
      res = await createContact(apiKey, listId, email, null);
    }
    if (!res.ok) {
      console.error("Brevo sign-up failed:", res.status, await res.text());
      return Response.json({ error: "Something went wrong. Please try again or message us on WhatsApp." }, { status: 502 });
    }
  } catch (error) {
    console.error("Brevo sign-up error:", error);
    return Response.json({ error: "Something went wrong. Please try again or message us on WhatsApp." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
