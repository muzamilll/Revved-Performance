// True on Vercel preview deployments and in local development, false on the live site.
// Proposals awaiting sign-off (preview offers, photo and review slots) only render when this is true.
export function isPreviewBuild(): boolean {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV !== "production";
  return process.env.NODE_ENV !== "production";
}
