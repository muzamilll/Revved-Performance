import { insertLead } from "../../../lib/leads/db";
import { deriveSource } from "../../../lib/leads/source";
import { CONTACT_METHODS, ContactMethod } from "../../../lib/leads/types";
import { site } from "../../../data/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

// Sends the owner a short email for each form enquiry, if Resend is configured.
async function notifyOwner(lead: { name: string | null; phone: string | null; email: string | null; reg: string | null; service: string | null; message: string | null; source: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.OWNER_EMAIL;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !to || !from) return;
  const dashboard = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/dashboard`;
  const lines = [
    `New enquiry for ${site.name}`,
    "",
    `Name: ${lead.name ?? "-"}`,
    `Phone: ${lead.phone ?? "-"}`,
    `Email: ${lead.email ?? "-"}`,
    `Reg: ${lead.reg ?? "-"}`,
    `Service: ${lead.service ?? "-"}`,
    `Source: ${lead.source}`,
    "",
    lead.message ?? "",
    "",
    `Open the dashboard: ${dashboard}`,
  ];
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to, subject: `New enquiry: ${lead.service ?? lead.reg ?? "website"}`, text: lines.join("\n") }),
    });
  } catch (error) {
    console.error("Owner notification failed");
    void error;
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill it in
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const contactMethod = body.contactMethod as ContactMethod;
  if (!CONTACT_METHODS.includes(contactMethod)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const landing = (typeof body.landing === "object" && body.landing ? body.landing : {}) as Record<string, unknown>;
  const name = str(body.name, 100);
  const phone = str(body.phone, 30);
  const email = str(body.email, 254)?.toLowerCase() ?? null;
  const reg = str(body.reg, 10)?.toUpperCase().replace(/\s/g, "") ?? null;

  if (contactMethod === "form") {
    if (!name) return Response.json({ error: "Please add your name." }, { status: 400 });
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return Response.json({ error: "Please add a phone number we can reach you on." }, { status: 400 });
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      return Response.json({ error: "Please check your email address, or leave it blank." }, { status: 400 });
    }
  }

  const source = deriveSource({
    src: str(landing.src, 30),
    utmSource: str(landing.utmSource, 100),
    utmMedium: str(landing.utmMedium, 100),
    fbclid: landing.fbclid === true,
    gclid: landing.gclid === true,
    referrer: str(landing.referrer, 300),
  });

  const lead = {
    contactMethod,
    source,
    utmSource: str(landing.utmSource, 100),
    utmMedium: str(landing.utmMedium, 100),
    utmCampaign: str(landing.utmCampaign, 100),
    referrer: str(landing.referrer, 300),
    landingPage: str(landing.landingPage, 200),
    page: str(body.page, 200),
    service: str(body.service, 100),
    reg,
    name,
    phone,
    email,
    message: str(body.message, 1000),
    isTest: landing.isTest === true,
  };

  try {
    await insertLead(lead);
  } catch (error) {
    console.error("Lead insert failed:", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: "Something went wrong. Please try again or message us on WhatsApp." }, { status: 502 });
  }

  if (contactMethod === "form" && !lead.isTest) await notifyOwner(lead);

  return Response.json({ ok: true });
}
