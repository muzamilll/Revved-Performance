import { Wrench } from "lucide-react";

// Plain, still icons for the two routes in. The moving picture is the hero; these stay quiet.
export function RouteIcon({ kind }: { kind: "care" | "performance" }) {
  if (kind === "care") return <Wrench className="h-8 w-8 text-ink" strokeWidth={1.8} aria-hidden="true" />;
  return (
    <svg width="38" height="30" viewBox="0 0 96 64" aria-hidden="true">
      <path d="M14 52A34 34 0 0 1 82 52" fill="none" stroke="#D9D2CD" strokeWidth="7" strokeLinecap="round" />
      <path d="M62 21A34 34 0 0 1 82 52" fill="none" stroke="#693C56" strokeWidth="7" strokeLinecap="round" />
      <path d="M48 52L66 30" stroke="#1A1418" strokeWidth="5" strokeLinecap="round" />
      <circle cx="48" cy="52" r="6" fill="#1A1418" />
    </svg>
  );
}
