import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { guides } from "../../data/guides";
import { PageHero } from "../../components/sections/PageHero";
import { Band, cardClass, cardInteractive } from "../../components/sections/Band";
import { FinalCall } from "../../components/sections/shared";
import { cn } from "../../lib/utils";

export const metadata: Metadata = {
  title: "Guides",
  description: "Plain-English guides to car problems and tuning questions: DPF warning lights, cars that won't start, and whether remapping is safe.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumb="Guides"
        title="Know your car."
        intro={<p>Straight answers to the questions people ask us most, before they book.</p>}
      />
      <Band>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className={cn(cardClass.cream, cardInteractive, "group flex h-full flex-col gap-3 p-6 hover:border-ink/40 hover:shadow-[0_16px_36px_-20px_rgba(26,20,24,0.45)]")}
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum">{g.category} · {g.readMinutes} min read</span>
                <span className="text-[21px] font-semibold leading-snug tracking-[-0.01em]">{g.title}</span>
                <span className="text-[15px] leading-relaxed text-ink-soft">{g.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[15px] font-semibold text-plum">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Band>
      <FinalCall />
    </>
  );
}
