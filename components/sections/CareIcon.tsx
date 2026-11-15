import { CareCategory } from "../../types";

// Line icons for the four car care categories
export function CareIcon({ slug, className }: { slug: CareCategory["slug"]; className?: string }) {
  const paths: Record<CareCategory["slug"], React.ReactNode> = {
    batteries: (
      <>
        <rect x="3" y="8" width="26" height="18" rx="2" />
        <path d="M9 8V5h4v3M19 8V5h4v3M8 17h6M11 14v6M18 17h6" />
      </>
    ),
    servicing: <path d="M6 12h14v14H6zM20 15l7-5 2 2-6 7M9 12V8h6v4M4 28h22" />,
    brakes: (
      <>
        <circle cx="15" cy="16" r="11" />
        <circle cx="15" cy="16" r="4" />
        <path d="M24 7h5v18h-5" />
      </>
    ),
    diagnostics: (
      <>
        <rect x="6" y="4" width="18" height="22" rx="2" />
        <rect x="10" y="8" width="10" height="8" />
        <path d="M10 21h2M15 21h2M12 26v3h14" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[slug]}
    </svg>
  );
}
