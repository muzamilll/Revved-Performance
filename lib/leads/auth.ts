import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "revved_dashboard";
const SESSION_DAYS = 14;

function secret(): string | null {
  return process.env.DASHBOARD_SECRET || null;
}

export function isDashboardConfigured(): boolean {
  return !!process.env.DASHBOARD_PASSWORD && !!secret();
}

function sign(value: string): string {
  return createHmac("sha256", secret()!).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected || !secret()) return false;
  // Compare hashes so the comparison takes the same time whatever the length.
  return safeEqual(sign(`pw:${input}`), sign(`pw:${expected}`));
}

export function createSessionValue(): { value: string; maxAge: number } {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const expires = String(Date.now() + maxAge * 1000);
  return { value: `${expires}.${sign(expires)}`, maxAge };
}

function isValidSession(value: string | undefined): boolean {
  if (!value || !secret()) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  return Number(expires) > Date.now();
}

export async function isLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return isValidSession(store.get(SESSION_COOKIE)?.value);
}
