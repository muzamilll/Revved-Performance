"use client";

import * as React from "react";

// The home opening's one picture: a car parked at home, the owner asks, the price and time are
// agreed, the van comes, the car is sorted where it's parked. One story, a different job each loop.
// Reduced motion shows the finished scene, still.

const ROUTE = "M-50 390H176Q206 390 206 360V276Q206 246 236 246H350";
const ROADS = "M-40 390H640M-40 246H640M206-40V520";
const VB = { x: 140, y: 66, w: 460, h: 368 };

const JOBS = [
  { ask: "Service is due. Can you do Thursday?", done: "Service complete" },
  { ask: "Brakes are grinding. This week?", done: "New pads and discs fitted" },
  { ask: "Battery’s flat. Can you come today?", done: "New battery fitted" },
];

function House({ x, y, w, h, front }: { x: number; y: number; w: number; h: number; front: 1 | -1 }) {
  const mid = y + h / 2, i = w * 0.24, edge = front > 0 ? y + h : y;
  return (
    <g stroke="#CFC4BA" strokeWidth={1.5} strokeLinejoin="round">
      <path d={`M${x} ${y}H${x + w}V${y + h}H${x}Z`} fill="#E4DBD2" />
      <path d={`M${x} ${edge}L${x + i} ${mid}H${x + w - i}L${x + w} ${edge}Z`} fill="#D8CDC2" />
      <path d={`M${x} ${y}L${x + i} ${mid}L${x} ${y + h}Z M${x + w} ${y}L${x + w - i} ${mid}L${x + w} ${y + h}Z`} fill="#DED4CA" />
    </g>
  );
}

const TREES: [number, number, number][] = [[262, 30, 20], [330, 78, 13], [520, 46, 18], [600, 90, 15], [150, 62, 14]];

export function HeroScene() {
  const scene = React.useRef<HTMLDivElement>(null);
  const r = {
    route: React.useRef<SVGPathElement>(null),
    trail: React.useRef<SVGPathElement>(null),
    van: React.useRef<SVGGElement>(null),
    work: React.useRef<SVGCircleElement>(null),
    cam: React.useRef<SVGGElement>(null),
    bonnet: React.useRef<SVGRectElement>(null),
    ask: React.useRef<HTMLDivElement>(null),
    askText: React.useRef<HTMLSpanElement>(null),
    ok: React.useRef<HTMLDivElement>(null),
    way: React.useRef<HTMLDivElement>(null),
    stamp: React.useRef<HTMLDivElement>(null),
    doneText: React.useRef<HTMLSpanElement>(null),
  };

  React.useEffect(() => {
    const route = r.route.current!, trail = r.trail.current!, van = r.van.current!, work = r.work.current!,
      cam = r.cam.current!, bonnet = r.bonnet.current!, ask = r.ask.current!, askText = r.askText.current!,
      ok = r.ok.current!, way = r.way.current!, stamp = r.stamp.current!, doneText = r.doneText.current!, box = scene.current!;
    const L = route.getTotalLength();
    trail.style.strokeDasharray = String(L);
    const T = 13.5;
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const on = (e: HTMLElement, b: boolean) => e.classList.toggle("is-on", b);
    const setJob = (i: number) => {
      const j = JOBS[i % JOBS.length];
      askText.textContent = j.ask;
      doneText.textContent = j.done;
    };

    const frame = (t: number) => {
      // 0.5 the ask · 1.9 agreed · 3.4 van drives in · 5.6 arrives · 6.6–9 the work · 9.2 sorted, held · 13.5 next job
      on(ask, t > 0.5 && t < 3.6);
      on(ok, t > 1.9 && t < 3.6);
      const p = ease(clamp((t - 3.4) / 2.2));
      const d = p * L, a = route.getPointAtLength(d), b = route.getPointAtLength(Math.min(L, d + 0.5));
      const ang = p >= 1 ? 0 : (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      van.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
      van.style.opacity = t < 3.3 || t > 12.9 ? "0" : "1";
      trail.style.strokeDashoffset = String(L * (1 - p));
      trail.style.opacity = String(t < 3.3 ? 0 : t < 6 ? 0.9 : Math.max(0, 0.9 - (t - 6) * 0.9));
      const s = box.clientWidth / VB.w;
      way.style.transform = `translate(${(a.x - VB.x) * s - way.offsetWidth / 2}px, ${(a.y - VB.y - 40) * s}px)`;
      on(way, t > 3.6 && t < 5.5);
      const z = 1 + 0.16 * easeOut(clamp((t - 5.6) / 1)) - 0.16 * ease(clamp((t - 12.4) / 1));
      cam.setAttribute("transform", `translate(395 190) scale(${z}) translate(-395 -190)`);
      const working = t > 6.5 && t < 9.3;
      work.setAttribute("opacity", t > 6.5 && t < 9.4 ? "1" : "0");
      work.setAttribute("stroke-dashoffset", String(251.3 * (1 - ease(clamp((t - 6.6) / 2.4)))));
      bonnet.setAttribute("transform", working ? "translate(0 -6)" : "");
      bonnet.setAttribute("fill", working ? "#B4AAAF" : "#4A4146");
      on(stamp, t > 9.2 && t < 12.6);
    };

    setJob(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame(10.5);
      return;
    }
    let raf = 0, start: number | null = null, loop = 0;
    const tick = (now: number) => {
      if (start === null) start = now;
      const sec = (now - start) / 1000, ix = Math.floor(sec / T);
      if (ix !== loop) { loop = ix; setJob(ix); }
      frame(sec % T);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={scene}
      role="img"
      aria-label="A car parked on a driveway at home. The owner asks for a service, the price and time are agreed, a Revved van arrives and the car is sorted where it's parked."
      className="hero-scene relative aspect-[5/4] overflow-hidden rounded-[22px] bg-[#EEE9E3] text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]"
    >
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} aria-hidden="true" className="block h-full w-full">
        <defs>
          <filter id="hs-sh" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#1A1418" floodOpacity=".18" />
          </filter>
        </defs>
        <g ref={r.cam}>
          {/* gardens, trees and neighbouring driveways */}
          {[[-20, 0, 640, 110], [-20, 272, 640, 96], [-20, 412, 640, 80]].map(([x, y, w, h]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} fill="#E6E8DB" />
          ))}
          {[[90, 128], [452, 128]].map(([x, y]) => <rect key={x} x={x} y={y} width={14} height={98} fill="#DCD3CB" />)}
          {TREES.map(([x, y, rr]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={rr} fill="#CBD6BC" />
              <circle cx={x - rr * 0.25} cy={y - rr * 0.25} r={rr * 0.45} fill="#D8E1CB" />
            </g>
          ))}
          {/* roads */}
          <g fill="none">
            <path d={ROADS} stroke="#DED6CE" strokeWidth={40} />
            <path d={ROADS} stroke="#FBFAF8" strokeWidth={34} />
            <path d={ROADS} stroke="#E2DAD2" strokeWidth={1.5} strokeDasharray="10 12" />
          </g>
          {/* neighbours: the same houses, quieter */}
          {[10, 104].map((x) => <House key={`n${x}`} x={x} y={118} w={78} h={78} front={1} />)}
          {[470, 550].map((x) => <House key={`n${x}`} x={x} y={118} w={72} h={78} front={1} />)}
          {[10, 104, 240, 332, 424, 516].map((x) => <House key={`s${x}`} x={x} y={284} w={78} h={72} front={-1} />)}
          {[10, 104, 240, 332, 424, 516].map((x) => <House key={`b${x}`} x={x} y={420} w={78} h={72} front={-1} />)}
          {[[10, 172], [470, 152]].map(([x, w]) => <rect key={`h${x}`} x={x} y={220} width={w} height={5} rx={2} fill="#C7D2B6" />)}

          {/* the customer's home */}
          <rect x={296} y={196} width={92} height={30} fill="#E3EAD6" />
          <rect x={296} y={220} width={92} height={5} rx={2} fill="#B8C7A3" />
          <rect x={334} y={196} width={14} height={30} fill="#E4DCD4" />
          <rect x={392} y={128} width={46} height={98} rx={3} fill="#DCD3CB" />
          <g stroke="#1A1418" strokeWidth={2.5} strokeLinejoin="round">
            <path d="M296 118H388V196H296Z" fill="#E7CAD8" />
            <path d="M296 196L318 157H366L388 196Z" fill="#CFA3BA" />
            <path d="M296 118L318 157H366L388 118Z" fill="#EDD7E2" />
            <path d="M296 118L318 157L296 196Z" fill="#DDB6CA" />
            <path d="M388 118L366 157L388 196Z" fill="#DDB6CA" />
            <rect x={350} y={128} width={11} height={11} fill="#fff" />
            <rect x={333} y={196} width={16} height={7} rx={1.5} fill="#693C56" />
            <path d="M304 196H326L322 206H308Z" fill="#E7CAD8" />
            <path d="M358 196H380L376 206H362Z" fill="#E7CAD8" />
          </g>
          <rect x={440} y={206} width={8} height={10} rx={1.5} fill="#3B6E4A" stroke="#1A1418" strokeWidth={1.5} />
          <rect x={450} y={206} width={8} height={10} rx={1.5} fill="#2B2B2B" stroke="#1A1418" strokeWidth={1.5} />
          <g transform="translate(262 157)">
            <rect x={-26} y={-11} width={52} height={22} rx={11} fill="#1A1418" />
            <path d="M26 -5L32 0L26 5Z" fill="#1A1418" />
            <text x={0} y={3.5} textAnchor="middle" fontWeight={700} fontSize={11} fill="#fff" style={{ fontFamily: "var(--font-inter)" }}>Home</text>
          </g>

          {/* the customer's car, parked the whole time */}
          <g transform="translate(415 172)" filter="url(#hs-sh)">
            <rect x={-15} y={-27} width={30} height={54} rx={9} fill="#3A3237" stroke="#1A1418" strokeWidth={2.5} />
            <rect x={-11} y={-6} width={22} height={16} rx={3} fill="#5A5156" />
            <path d="M-11 -6H11L9 -14H-9Z" fill="#A79DA2" />
            <path d="M-11 10H11L9 16H-9Z" fill="#A79DA2" />
            <rect ref={r.bonnet} x={-12} y={-25} width={24} height={12} rx={4} fill="#4A4146" />
            <rect x={-17} y={-10} width={3} height={5} rx={1} fill="#1A1418" />
            <rect x={14} y={-10} width={3} height={5} rx={1} fill="#1A1418" />
          </g>
          <circle ref={r.work} cx={415} cy={172} r={40} fill="none" stroke="#FFD500" strokeWidth={5} strokeLinecap="round" transform="rotate(-90 415 172)" strokeDasharray="251.3" strokeDashoffset="251.3" opacity={0} />

          {/* the route and the van */}
          <path ref={r.route} d={ROUTE} fill="none" stroke="none" />
          <path ref={r.trail} d={ROUTE} fill="none" stroke="#FFD500" strokeWidth={5} strokeLinecap="round" opacity={0} />
          <g ref={r.van} filter="url(#hs-sh)" opacity={0}>
            <rect x={-34} y={-15} width={68} height={30} rx={4} fill="#FFD500" stroke="#1A1418" strokeWidth={2.5} />
            <path d="M20 -15H28Q34 -15 34 -9V9Q34 15 28 15H20Z" fill="#F2C600" stroke="#1A1418" strokeWidth={2.5} strokeLinejoin="round" />
            <rect x={13} y={-12} width={7} height={24} rx={2} fill="#1A1418" />
            <rect x={15} y={-19} width={6} height={4} rx={1} fill="#1A1418" />
            <rect x={15} y={15} width={6} height={4} rx={1} fill="#1A1418" />
            <text x={-11} y={4.5} textAnchor="middle" fontSize={13} letterSpacing=".5" fill="#1A1418" style={{ fontFamily: "var(--font-anton)" }}>REVVED</text>
          </g>
        </g>
      </svg>

      <div ref={r.ask} className="hs-bub hs-ask"><small>You</small><span ref={r.askText}>{JOBS[0].ask}</span></div>
      <div ref={r.ok} className="hs-bub hs-ok">
        <svg viewBox="0 0 20 20" fill="none" stroke="#FFD500" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
        Price and time agreed
      </div>
      <div ref={r.way} className="hs-bub hs-way">On our way</div>
      <div ref={r.stamp} className="hs-stamp"><b>SORTED</b><span ref={r.doneText}>{JOBS[0].done}</span></div>
    </div>
  );
}
