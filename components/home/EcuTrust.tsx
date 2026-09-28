import { BatteryCharging, ClipboardCheck, Cpu, FileCode2, ShieldCheck, type LucideIcon } from "lucide-react";
import { HomeData } from "../../types";
import { SectionHeading } from "../layout/layout-primitives";
import { cn } from "../../lib/utils";

const icons: Record<HomeData["ecuTrust"]["items"][number]["id"], LucideIcon> = {
  file: FileCode2,
  tool: Cpu,
  power: BatteryCharging,
  health: ClipboardCheck,
  warranty: ShieldCheck,
};

export function EcuTrust({ data }: { data: HomeData["ecuTrust"] }) {
  return (
    <>
      <SectionHeading eyebrow={data.eyebrow} title={data.title} intro={data.intro} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.items.map((item) => {
          const Icon = icons[item.id];
          const isWarranty = item.id === "warranty";
          return (
            <li
              key={item.id}
              className={cn(
                "flex gap-4 p-6 rounded-xl bg-background border",
                // The warranty is the headline promise, so it gets the accent treatment
                isWarranty ? "border-accent/50 bg-accent/5 sm:col-span-2" : "border-border"
              )}
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent-light">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wide mb-1">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
                {item.note && <p className="mt-2 text-xs text-muted/70">{item.note}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
