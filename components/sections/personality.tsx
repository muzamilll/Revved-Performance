import * as React from "react";
import Link from "next/link";
import { ArrowRight, BatteryWarning, CarFront, Gauge, TriangleAlert } from "lucide-react";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { WhatsAppLink } from "../ui/actions";
import { BASE, COVERAGE_MILES, mapTowns, regions } from "../../data/locations";
import { RegionList } from "./RegionList";
import { cn } from "../../lib/utils";

// Brief 4a: Lemonade's structure and small touches of personality, in Revved's photo world.
// Yellow stays rare: buttons, prices, tags and the Ilford pin.

/* ---------- Small yellow label (facts only) ---------- */
export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block rounded-sm bg-plate px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink", className)}>
      {children}
    </span>
  );
}

/* ---------- Handwritten note: decorative only, hidden from screen readers ---------- */
export function HandNote({ children, className, arrow = "down-left" }: { children: React.ReactNode; className?: string; arrow?: "down-left" | "down-right" }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none select-none font-hand text-[22px] leading-none text-plum", className)}>
      <span className="inline-block -rotate-3">{children}</span>
      <svg
        viewBox="0 0 60 40"
        fill="none"
        className={cn("mt-1 h-8 w-12", arrow === "down-right" ? "ml-auto -scale-x-100" : "")}
      >
        <path d="M54 4 C 40 6, 20 12, 10 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 22 L 10 33 L 20 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ---------- "If..." cards ---------- */
const ifCards = [
  {
    title: "If your car won't start",
    line: "Jump-starts and new batteries at your door.",
    href: "/batteries",
    Icon: BatteryWarning,
    tag: "24/7",
  },
  {
    title: "If a warning light comes on",
    line: "We read the fault where the car is parked, DPF light included.",
    href: "/diagnostics",
    Icon: TriangleAlert,
  },
  {
    title: "If you're buying a used car",
    line: "We check it over at the seller's before you hand over any money.",
    href: "/diagnostics/pre-purchase-inspection",
    Icon: CarFront,
  },
  {
    title: "If you want more power",
    line: "A Stage 1 file written for your engine, from £179.",
    href: "/performance",
    Icon: Gauge,
  },
];

export function IfCards() {
  return (
    <Band id="if" label="Find your situation" className="pb-4 lg:pb-6">
      <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
        {ifCards.map(({ title, line, href, Icon, tag }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(cardClass.cream, cardInteractive, "group relative flex h-full flex-col gap-3 p-6 hover:border-ink/40 hover:shadow-[0_16px_36px_-20px_rgba(26,20,24,0.45)]")}
            >
              <span className="flex items-start justify-between">
                {/* Line icon in plum, with a single yellow detail */}
                <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-lg bg-plum/[0.08] text-plum">
                  <Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
                  <span aria-hidden="true" className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-plate ring-2 ring-white" />
                </span>
                {tag && <Tag>{tag}</Tag>}
              </span>
              <span className="mt-2 text-[20px] font-semibold leading-snug tracking-[-0.01em]">{title}</span>
              <span className="text-[15px] leading-relaxed text-ink-soft">{line}</span>
              <ArrowRight className="mt-auto h-5 w-5 text-plum transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

/* ---------- WhatsApp chat strip ("How it works") ---------- */
// One battery job, start to finish, inside the 90-minute promise. Illustrative: the price is
// for one car; every price is confirmed before the customer agrees.
type ChatLine = { from: "customer" | "revved"; text: string; time: string };
const chat: ChatLine[] = [
  { from: "customer", text: "My car won't start. It's parked at work in Romford.", time: "16:02" },
  { from: "revved", text: "No problem, we come to your workplace. What's the reg?", time: "16:03" },
  { from: "customer", text: "AB12 CDE. How much?", time: "16:04" },
  { from: "revved", text: "£139 supplied and fitted, with a 3-year battery warranty. That's the full price, nothing added after.", time: "16:05" },
  { from: "customer", text: "Can you do it while I'm working?", time: "16:05" },
  { from: "revved", text: "Yes. Leave the keys at reception and we'll message you when we're on our way.", time: "16:06" },
  { from: "revved", text: "On our way, about 25 minutes.", time: "16:40" },
  { from: "revved", text: "All done ✅ New battery fitted and tested. Keys are back at reception.", time: "17:20" },
];

const steps = [
  { title: "Tell us the job", text: "Book on the site or message us. It takes about a minute." },
  { title: "We confirm on WhatsApp", text: "The price for your car and a time that suits you." },
  { title: "We come to you", text: "Home or work, 7am to midnight. You pay when the job is done." },
];

export function ChatStrip() {
  return (
    <Band id="how-it-works" className="border-t border-line">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
        <div>
          <BandHeader eyebrow="How it works" title="Sorted on WhatsApp." />
          <ol className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span aria-hidden="true" className="w-6 shrink-0 font-accent text-[32px] italic leading-none text-plum">{i + 1}</span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <WhatsAppLink variant="primary" className="mt-9 min-h-[56px] px-7 text-[16px]" />
        </div>

        {/* The phone: HTML, not a screenshot. Messages appear one by one as it scrolls in. */}
        <figure className="relative mx-auto w-full max-w-[19.5rem]">
          <div data-chat="" className="overflow-hidden rounded-[2.25rem] border-[6px] border-ink bg-[#EFE9E4] shadow-[0_30px_60px_-30px_rgba(26,20,24,0.6)]">
            <div className="flex items-center gap-3 bg-plum px-4 pb-3 pt-4 text-white">
              <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 font-display text-[15px]">R</span>
              <span className="flex flex-col">
                <span className="text-[15px] font-semibold leading-tight">Revved Performance</span>
                <span className="text-[12px] text-white/70">WhatsApp</span>
              </span>
            </div>
            <ul className="flex flex-col gap-1.5 px-2.5 py-3" aria-label="An example battery job on WhatsApp, from first message to done">
              {chat.map((m, i) => (
                <li
                  key={i}
                  data-chat-msg=""
                  className={cn(
                    "max-w-[86%] rounded-2xl px-3 pb-1 pt-1.5 text-[13.5px] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.08)]",
                    m.from === "customer" ? "self-end rounded-br-md bg-plum text-white" : "self-start rounded-bl-md bg-white text-ink"
                  )}
                >
                  <span className="sr-only">{m.from === "customer" ? "Customer: " : "Revved: "}</span>
                  {m.text}
                  <span className={cn("ml-1.5 inline-block translate-y-0.5 text-[10.5px]", m.from === "customer" ? "text-white/65" : "text-ink-soft")}>{m.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <figcaption className="mt-2.5 text-center text-[12px] text-ink-soft">Illustrative example. Prices vary by vehicle.</figcaption>
          <HandNote className="absolute -left-4 -top-12 hidden sm:block lg:-left-28 lg:top-24" arrow="down-right">
            yes, on your driveway
          </HandNote>
        </figure>
      </div>
    </Band>
  );
}

/* ---------- Coverage map ---------- */
const MILES_PER_LAT = 69;
const MILES_PER_LON = 69 * Math.cos((BASE.lat * Math.PI) / 180);

function toMiles(lat: number, lon: number) {
  return { x: (lon - BASE.lon) * MILES_PER_LON, y: -(lat - BASE.lat) * MILES_PER_LAT };
}

export function CoverageMap() {
  const R = COVERAGE_MILES;
  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <svg viewBox={`${-R - 6} ${-R - 4} ${2 * R + 12} ${2 * R + 8}`} className="h-auto w-full" role="img" aria-label="Map: Revved covers anywhere within 20 miles of Ilford">
        {/* 10-mile guide ring */}
        <circle cx="0" cy="0" r={R / 2} fill="none" stroke="#693C56" strokeOpacity="0.25" strokeWidth="0.15" strokeDasharray="0.6 0.6" />
        {/* The 20-mile ring: draws on scroll */}
        <circle data-map-ring="" pathLength={1} cx="0" cy="0" r={R} fill="#693C56" fillOpacity="0.05" stroke="#693C56" strokeWidth="0.35" transform="rotate(-90)" />
        {mapTowns.map((t) => {
          const { x, y } = toMiles(t.lat, t.lon);
          const right = t.side ? t.side === "right" : x >= -1;
          return (
            <g key={t.name}>
              <circle cx={x} cy={y} r="0.45" fill="#693C56" />
              <text x={right ? x + 1 : x - 1} y={y + 0.55} fontSize="1.55" fill="#1A1418" textAnchor={right ? "start" : "end"} fontFamily="inherit">
                {t.name}
              </text>
            </g>
          );
        })}
        {/* Ilford pin, the one yellow detail */}
        <g>
          <circle cx="0" cy="0" r="1.6" fill="#FFD500" stroke="#1A1418" strokeWidth="0.3" />
          <circle cx="0" cy="0" r="0.55" fill="#1A1418" />
          <text x="0" y="-2.6" fontSize="1.8" fontWeight="700" fill="#1A1418" textAnchor="middle" fontFamily="inherit">Ilford</text>
        </g>
        <text x={R * 0.7071 + 0.8} y={R * 0.7071 + 2.4} fontSize="1.5" fill="#693C56" fontFamily="inherit">20 miles</text>
      </svg>
    </figure>
  );
}

/* ---------- Areas we cover ---------- */
export function AreasCovered() {
  return (
    <Band id="areas" className="border-t border-line">
      <BandHeader
        eyebrow="East London. Essex. Your door."
        title={<>Anywhere within 20 miles of Ilford.</>}
        aside="If you're within 20 miles of Ilford, we'll come to you. Find your town below."
      />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
        <CoverageMap />
        <div>
          <RegionList regions={regions} />
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[15px] leading-relaxed">Not on the list, or a bit further out? Ask us on WhatsApp and we&apos;ll tell you straight away.</p>
            <WhatsAppLink
              message="Hi Revved, do you cover my area? My postcode is: "
              className="shrink-0 px-5 text-ink"
            />
          </div>
        </div>
      </div>
    </Band>
  );
}

/* ---------- Skyline: layered East London rooftops at dusk ---------- */
// Simple flat shapes. Back layers are lighter, front layers deeper. Each layer has a parallax
// speed for desktop (MotionProvider); static on phones and with reduced motion.
export function Skyline() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[220px] overflow-hidden sm:h-[260px] lg:h-[300px]">
      <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full">
        {/* Far: tower blocks and the City in the distance */}
        <g data-skyline-layer="" data-speed="0.25" fill="#7B4A66">
          <path d="M0 300 V170 H60 V130 H110 V170 H180 V110 H230 V150 H290 V95 H320 V80 H350 V95 H380 V160 H460 V120 H520 V160 H600 V140 H640 V100 H690 V140 H760 V125 H820 V70 H840 V60 H860 V70 H880 V150 H960 V115 H1030 V160 H1100 V105 H1150 V145 H1230 V125 H1290 V160 H1360 V120 H1440 V300 Z" />
        </g>
        {/* Middle: terraced roofs with chimney stacks */}
        <g data-skyline-layer="" data-speed="0.5" fill="#5A2F48">
          <path d="M0 300 V210 L40 185 L80 210 V205 L120 180 L160 205 H170 V172 H184 V205 L220 180 L260 205 L300 180 L340 205 H352 V176 H366 V205 L400 182 L440 205 L480 180 L520 205 L560 182 L600 205 H612 V170 H628 V205 L660 181 L700 205 L740 180 L780 205 L820 182 L860 205 H872 V174 H888 V205 L920 180 L960 205 L1000 182 L1040 205 L1080 180 L1120 205 H1132 V172 H1148 V205 L1180 182 L1220 205 L1260 180 L1300 205 L1340 182 L1380 205 L1440 185 V300 Z" />
        </g>
        {/* Front: street, lamp posts and one parked car */}
        <g data-skyline-layer="" data-speed="0.85" fill="#3B1D2F">
          <path d="M0 300 V250 H1440 V300 Z" />
          {[180, 640, 1120].map((x) => (
            <g key={x}>
              <rect x={x} y="200" width="4" height="52" />
              <path d={`M${x - 6} 200 h16 l-3 -6 h-10 z`} />
              <circle cx={x + 2} cy="205" r="5" fill="#FFD500" fillOpacity="0.35" />
            </g>
          ))}
          {/* A hatchback, parked */}
          <path d="M820 250 v-14 q0 -6 6 -7 l22 -3 l16 -14 q4 -3 10 -3 h46 q6 0 10 4 l14 14 l20 3 q6 1 6 7 v13 z" />
          <circle cx="852" cy="251" r="9" fill="#2A1421" />
          <circle cx="938" cy="251" r="9" fill="#2A1421" />
        </g>
      </svg>
    </div>
  );
}
