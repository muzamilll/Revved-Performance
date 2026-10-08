import { locations } from "../../data/locations";
import { site } from "../../data/site";

// Schematic service-area map, drawn in SVG so it stays sharp and on-palette.
// Town positions are projected from real coordinates, then nudged apart where the
// inner East London towns sit too close to label. Not to scale.
// Towns in data/locations.ts without a position here are left off the map (they still show in the list).

type Side = "l" | "r" | "t" | "b";
type Pin = { x: number; y: number; side: Side };

type Layout = {
  w: number;
  h: number;
  font: number;
  pins: Record<string, Pin>;
  thames: string;
  m25: string;
  thamesLabel: { x: number; y: number };
  m25Label: { x: number; y: number };
};

const DESKTOP: Layout = {
  w: 1200,
  h: 720,
  font: 17,
  pins: {
    romford: { x: 751, y: 282, side: "r" },
    ilford: { x: 478, y: 334, side: "r" },
    barking: { x: 506, y: 405, side: "r" },
    dagenham: { x: 662, y: 386, side: "b" },
    hornchurch: { x: 835, y: 343, side: "t" },
    upminster: { x: 925, y: 360, side: "b" },
    chigwell: { x: 497, y: 164, side: "r" },
    brentwood: { x: 1044, y: 156, side: "r" },
    loughton: { x: 444, y: 75, side: "r" },
    rainham: { x: 770, y: 455, side: "r" },
    grays: { x: 1092, y: 573, side: "t" },
    chingford: { x: 290, y: 127, side: "r" },
    walthamstow: { x: 250, y: 262, side: "l" },
    leyton: { x: 280, y: 335, side: "l" },
    leytonstone: { x: 335, y: 300, side: "r" },
    stratford: { x: 305, y: 405, side: "l" },
    woodford: { x: 380, y: 196, side: "r" },
    wanstead: { x: 400, y: 255, side: "r" },
    enfield: { x: 130, y: 80, side: "r" },
    dartford: { x: 826, y: 660, side: "r" },
  },
  thames:
    "M-72,490 C80,490 240,492 312,490 S400,462 432,467 S520,484 552,481 S660,494 696,498 S770,515 792,533 S850,575 876,585 S930,608 960,613 S1040,626 1080,625 S1200,616 1272,613",
  m25: "M931,740 C934,680 932,640 936,605 S968,540 972,504 S968,410 965,374 S955,290 941,259 S905,205 876,181 S810,118 768,86 S660,38 600,20 S480,-2 432,-9",
  thamesLabel: { x: 1150, y: 655 },
  m25Label: { x: 986, y: 470 },
};

// Phone layout: same geography, spread wider relative to the canvas so labels stay readable
const MOBILE: Layout = {
  w: 640,
  h: 660,
  font: 21,
  pins: {
    romford: { x: 420, y: 250, side: "r" },
    ilford: { x: 300, y: 345, side: "r" },
    barking: { x: 310, y: 425, side: "r" },
    dagenham: { x: 410, y: 370, side: "b" },
    hornchurch: { x: 475, y: 315, side: "r" },
    upminster: { x: 540, y: 360, side: "b" },
    chigwell: { x: 300, y: 140, side: "r" },
    brentwood: { x: 590, y: 160, side: "l" },
    loughton: { x: 300, y: 60, side: "r" },
    rainham: { x: 440, y: 445, side: "r" },
    grays: { x: 580, y: 520, side: "t" },
    chingford: { x: 130, y: 125, side: "r" },
    walthamstow: { x: 90, y: 235, side: "r" },
    leyton: { x: 110, y: 345, side: "l" },
    leytonstone: { x: 180, y: 300, side: "r" },
    stratford: { x: 150, y: 405, side: "r" },
    woodford: { x: 230, y: 190, side: "r" },
    wanstead: { x: 270, y: 262, side: "r" },
    enfield: { x: 60, y: 70, side: "r" },
    dartford: { x: 430, y: 600, side: "l" },
  },
  thames: "M-20,480 C100,480 160,478 200,470 S280,462 330,470 S420,478 470,500 S540,560 600,570 S660,572 680,572",
  m25: "M470,690 C478,620 520,560 560,500 S580,420 578,360 S566,230 545,170 S480,60 420,-10",
  thamesLabel: { x: 625, y: 640 },
  m25Label: { x: 592, y: 425 },
};

function labelProps(side: Side, gap: number) {
  switch (side) {
    case "l": return { dx: -gap, dy: 0, anchor: "end" as const, baseline: "central" as const };
    case "r": return { dx: gap, dy: 0, anchor: "start" as const, baseline: "central" as const };
    case "t": return { dx: 0, dy: -gap, anchor: "middle" as const, baseline: "auto" as const };
    case "b": return { dx: 0, dy: gap, anchor: "middle" as const, baseline: "hanging" as const };
  }
}

function MapCanvas({ layout, id, className }: { layout: Layout; id: string; className?: string }) {
  const { w, h, font, pins } = layout;

  const towns = locations.filter(l => pins[l.slug]).map(l => ({ ...l, ...pins[l.slug] }));
  const hub = pins.romford;
  const others = towns.filter(t => t.slug !== "romford");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>
        {`Map of our mobile service area, based in ${site.baseTown} and covering ${locations.map(l => l.name).join(", ")}.`}
      </title>
      <defs>
        <radialGradient id={`${id}-glow`} cx={hub.x} cy={hub.y} r={w * 0.55} gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#693C56" stopOpacity="0.38" />
          <stop offset="0.45" stopColor="#693C56" stopOpacity="0.1" />
          <stop offset="1" stopColor="#693C56" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-hub`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#9B607D" stopOpacity="0.55" />
          <stop offset="1" stopColor="#9B607D" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#25252A" strokeWidth="1" />
        </pattern>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#09090B" stopOpacity="0" />
          <stop offset="1" stopColor="#09090B" stopOpacity="0.7" />
        </linearGradient>
        {others.map(t => (
          <linearGradient key={t.slug} id={`${id}-streak-${t.slug}`} gradientUnits="userSpaceOnUse" x1={hub.x} y1={hub.y} x2={t.x} y2={t.y}>
            <stop offset="0" stopColor="#9B607D" stopOpacity="0.9" />
            <stop offset="1" stopColor="#9B607D" stopOpacity="0.08" />
          </linearGradient>
        ))}
      </defs>

      {/* Base: carbon, faint grid, plum light pooled over Romford */}
      <rect width={w} height={h} fill="#09090B" />
      <rect width={w} height={h} fill={`url(#${id}-grid)`} opacity="0.55" />
      <rect width={w} height={h} fill={`url(#${id}-glow)`} />

      {/* Range rings around the base */}
      {[0.2, 0.36, 0.52].map(r => (
        <circle key={r} cx={hub.x} cy={hub.y} r={w * r} fill="none" stroke="#A7A7AA" strokeOpacity="0.07" strokeDasharray="2 8" />
      ))}

      {/* Thames and M25 */}
      <g>
        <path d={layout.thames} fill="none" stroke="#25252A" strokeWidth="14" strokeLinecap="round" />
        <path d={layout.thames} fill="none" stroke="#A7A7AA" strokeOpacity="0.12" strokeWidth="1" />
        <path d={layout.m25} fill="none" stroke="#A7A7AA" strokeOpacity="0.22" strokeWidth="1.5" strokeDasharray="10 7" />
      </g>
      <text x={layout.thamesLabel.x} y={layout.thamesLabel.y} textAnchor="end" className="font-heading uppercase" fontSize={font * 0.7} letterSpacing="0.3em" fill="#A7A7AA" fillOpacity="0.5">
        River Thames
      </text>
      <text x={layout.m25Label.x} y={layout.m25Label.y} className="font-heading uppercase" fontSize={font * 0.7} letterSpacing="0.2em" fill="#A7A7AA" fillOpacity="0.4">
        M25
      </text>

      {/* Light streaks from the base out to each town, curved like a dyno trace */}
      <g fill="none" strokeLinecap="round">
        {others.map(t => {
          const mx = (hub.x + t.x) / 2;
          const my = (hub.y + t.y) / 2;
          // Bow each streak slightly upward, the way a power curve climbs
          const dx = t.x - hub.x;
          const dy = t.y - hub.y;
          const len = Math.hypot(dx, dy) || 1;
          const bow = Math.min(60, len * 0.18);
          const cx = mx + (dy / len) * bow * Math.sign(dx || 1);
          const cy = my - (Math.abs(dx) / len) * bow;
          return (
            <path key={t.slug} d={`M${hub.x},${hub.y} Q${cx},${cy} ${t.x},${t.y}`} stroke={`url(#${id}-streak-${t.slug})`} strokeWidth="1.25" />
          );
        })}
      </g>

      {/* Towns */}
      {others.map(t => {
        const l = labelProps(t.side, font * 0.75);
        return (
          <g key={t.slug}>
            <circle cx={t.x} cy={t.y} r={font * 0.6} fill="#9B607D" fillOpacity="0.18" />
            <circle cx={t.x} cy={t.y} r={font * 0.24} fill="#F4F2F0" />
            <text
              x={t.x + l.dx}
              y={t.y + l.dy}
              textAnchor={l.anchor}
              dominantBaseline={l.baseline}
              className="font-heading uppercase"
              fontSize={font}
              letterSpacing="0.08em"
              fill="#A7A7AA"
              stroke="#09090B"
              strokeWidth={font * 0.3}
              strokeLinejoin="round"
              paintOrder="stroke"
            >
              {t.name}
            </text>
          </g>
        );
      })}

      {/* Base */}
      <circle cx={hub.x} cy={hub.y} r={font * 3} fill={`url(#${id}-hub)`} />
      <circle cx={hub.x} cy={hub.y} r={font * 0.95} fill="none" stroke="#9B607D" strokeWidth="2" />
      <circle cx={hub.x} cy={hub.y} r={font * 0.42} fill="#F4F2F0" />
      <text x={hub.x + font * 1.4} y={hub.y - font * 0.15} className="font-heading uppercase" fontSize={font * 1.4} fontWeight="700" letterSpacing="0.06em" fill="#F4F2F0" stroke="#09090B" strokeWidth={font * 0.3} strokeLinejoin="round" paintOrder="stroke">
        {site.baseTown}
      </text>
      <text x={hub.x + font * 1.45} y={hub.y + font * 1.05} className="font-heading uppercase" fontSize={font * 0.7} letterSpacing="0.3em" fill="#B07A95">
        Our base
      </text>

      <rect width={w} height={h} fill={`url(#${id}-fade)`} pointerEvents="none" />
    </svg>
  );
}

export function ServiceAreaMap() {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-thin">
      <MapCanvas layout={DESKTOP} id="area-map-lg" className="hidden sm:block w-full h-auto" />
      <MapCanvas layout={MOBILE} id="area-map-sm" className="sm:hidden w-full h-auto" />
      <figcaption className="absolute bottom-3 left-4 md:bottom-5 md:left-6 text-[10px] md:text-xs uppercase tracking-widest text-muted/70">
        Schematic, not to scale
      </figcaption>
    </figure>
  );
}
