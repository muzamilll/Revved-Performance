import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { Reveal } from "../ui/Reveal";
import { emissionsDisclaimer, performancePrices, performanceTrust } from "../../data/performance";

// The Performance section (dark). Dark is used here and on the Performance pages only.
// Plum glow from the top, the oversized outlined word, three glass trust cards,
// the curve watermark, prices and the emissions disclaimer.
export function PerformanceSection() {
  return (
    <section
      id="performance"
      className="relative isolate overflow-hidden bg-deep text-cream"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 900px 520px at 50% 0%, rgba(105,60,86,0.9), rgba(105,60,86,0) 72%), radial-gradient(ellipse 520px 300px at 22% 34%, rgba(255,213,0,0.06), rgba(255,213,0,0) 70%), radial-gradient(ellipse 900px 360px at 50% 100%, rgba(105,60,86,0.35), rgba(105,60,86,0) 70%)",
      }}
    >
      {/* Oversized outlined word */}
      <div
        aria-hidden="true"
        className="text-outline-plate pointer-events-none absolute -left-1 top-5 -z-10 select-none whitespace-nowrap font-display text-[clamp(3.5rem,19vw,18.125rem)] uppercase leading-none lg:top-6"
      >
        Performance
      </div>

      {/* Curve watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 620 300"
        fill="none"
        className="pointer-events-none absolute -right-24 top-28 -z-10 w-[420px] opacity-[0.16] sm:right-0 lg:right-10 lg:top-56 lg:w-[620px] lg:opacity-[0.22]"
      >
        <path d="M0 290 C 120 280, 200 240, 290 150 S 440 40, 520 34 S 590 60, 620 90" stroke="#FFD500" strokeWidth="2.5" />
        <path d="M0 296 C 140 270, 240 200, 330 150 S 480 110, 620 130" stroke="#D9A9C2" strokeWidth="1.5" />
        <circle cx="520" cy="34" r="6" fill="#FFD500" />
        <circle cx="520" cy="34" r="14" stroke="#FFD500" strokeWidth="1" />
      </svg>

      <Container className="pt-[clamp(6.5rem,25vw,15rem)] pb-16 lg:pb-24">
        <Reveal className="flex flex-col gap-9 lg:gap-10">
          <div>
            <h2 className="flex flex-col gap-1">
              <span className="font-accent text-[clamp(1.6rem,6vw,2.125rem)] italic leading-tight text-plate">Performance</span>
              <span className="font-display text-[clamp(3.1rem,13.4vw,6.25rem)] uppercase leading-[0.96] tracking-[0.005em] text-white">More from your car.</span>
            </h2>
            <p className="mt-4 max-w-[37rem] text-[17px] leading-relaxed text-mist lg:text-[18px]">
              ECU remapping at your door, by an authorised agent of Top Gear Tuning.
            </p>
          </div>

          <ul className="grid gap-3 lg:grid-cols-3">
            {performanceTrust.map((item) => (
              <li key={item.title} className="border border-line-dark bg-[rgba(36,19,30,0.65)] p-5 backdrop-blur-[8px] lg:p-[22px]">
                <h3 className="text-[17px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mist">{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="border-t border-line-dark pt-7">
            <ul className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 xl:grid-cols-6">
              {performancePrices.map((item) => (
                <li key={item.slug}>
                  <EnquiryButton
                    plain
                    choice={item.slug}
                    aria-label={`${item.name}, ${item.price}. Get a quote`}
                    className="group flex h-full w-full flex-col gap-1 rounded-sm text-left"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-mist">{item.label}</span>
                    <span className="text-[26px] font-bold leading-tight tracking-[-0.01em] text-plate lg:text-[28px]">{item.price}</span>
                    <span className="text-[12px] leading-snug text-mist">{item.note}</span>
                    <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-semibold text-white underline-offset-4 group-hover:underline">
                      Get a quote <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </EnquiryButton>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <EnquiryButton choice="stage-1-remap" className="min-h-[56px] px-7 text-[16px]">Get a remap quote</EnquiryButton>
              <Link
                href="/services"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-3 text-[15px] font-semibold text-white underline-offset-4 hover:text-plate hover:underline"
              >
                All performance services <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="max-w-[47.5rem] text-[12px] leading-relaxed text-mist">{emissionsDisclaimer}</p>
        </Reveal>
      </Container>
    </section>
  );
}
