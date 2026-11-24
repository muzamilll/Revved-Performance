"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

// Towns grouped by region. Every town is real text in the page (for search).
// On phones each region folds; from tablet width they all start open.
export function RegionList({ regions }: { regions: { name: string; towns: string[] }[] }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    ref.current?.querySelectorAll("details").forEach((d) => (d.open = true));
  }, []);

  return (
    <div ref={ref} className="border-b border-line">
      {regions.map((region) => (
        <details key={region.name} className="group border-t border-line">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-3 text-[17px] font-semibold">
            <span>
              {region.name} <span className="ml-1 text-[14px] font-medium text-ink-soft">{region.towns.length}</span>
            </span>
            <ChevronDown className="h-5 w-5 shrink-0 text-plum transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
          </summary>
          <ul className="flex flex-wrap gap-x-1.5 gap-y-2 pb-5">
            {region.towns.map((town) => (
              <li key={town} className="rounded-full border border-line bg-white px-3 py-1.5 text-[14px]">
                {town}
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
