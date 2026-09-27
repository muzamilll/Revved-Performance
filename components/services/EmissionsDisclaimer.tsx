export function EmissionsDisclaimer({ text, className }: { text: string; className?: string }) {
  return <p className={`text-[11px] leading-snug text-muted ${className ?? ""}`}>{text}</p>;
}
