import { cookies } from "next/headers";
import { SESSION_COOKIE, checkPassword, createSessionValue, isDashboardConfigured } from "../../../../lib/leads/auth";

export async function POST(request: Request) {
  if (!isDashboardConfigured()) {
    return Response.json({ error: "The dashboard is not set up yet." }, { status: 503 });
  }
  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  // Small delay slows down password guessing
  await new Promise((r) => setTimeout(r, 400));
  if (!checkPassword(password)) {
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }
  const { value, maxAge } = createSessionValue();
  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
