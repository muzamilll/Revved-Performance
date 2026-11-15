import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { remapJobs, performanceTrust } from "../../data/performance";
import { remapFaqs } from "../../data/warranty";
import { offers } from "../../data/offers";
import { site } from "../../data/site";
import { locations } from "../../data/locations";
import { formatOfferPrice, getOffersForDisplay } from "../../lib/offers";
import { absoluteUrl, getSiteUrl } from "../../lib/seo";
import { getWhatsAppNumber } from "../../lib/whatsapp";
import { EnquiryButton } from "../../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../../components/ui/actions";
import { TrackView } from "../../components/analytics/TrackView";
import { PageHero, HeroPriceBox } from "../../components/sections/PageHero";
import { Band, BandHeader, cardClass } from "../../components/sections/Band";
import { JobRow } from "../../components/sections/JobRow";
import { PowerCurve } from "../../components/sections/PerformanceSection";
import { FaqSection, FinalCall } from "../../components/sections/shared";
import { cn } from "../../lib/utils";

export const metadata: Metadata = {
  title: "Mobile ECU Remapping, East London & Essex",
  description: "Stage 1, Stage 2 and gearbox remaps at your home or work across East London & Essex. Custom Top Gear Tuning files, health check before and after, lifetime software warranty.",
  alternates: { canonical: "/performance" },
};

export default function PerformancePage() {
  const stage1 = remapJobs.find((j) => j.id === "stage-1-remap") ?? remapJobs[0];
  const bundle = getOffersForDisplay(offers).find((o) => o.slug === "ecu-tcu-stage-1-bundle" && o.status === "active");

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mobile ECU remapping",
    "url": absoluteUrl("/performance"),
    "provider": { "@type": "AutomotiveBusiness", "@id": `${getSiteUrl()}/#business`, "name": site.name, "telephone": `+${getWhatsAppNumber()}`, "url": getSiteUrl() },
    "areaServed": locations.map((l) => ({ "@type": "City", "name": l.name })),
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": remapFaqs.map((f) => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
  };

  return (
    <>
      <TrackView event="service_view" properties={{ service: "performance" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero
        tone="dark"
        crumb="Performance"
        chip="Top Gear Tuning agent"
        title="More from your car."
        intro={<p>ECU and gearbox remapping at your home or work, with a file written for your engine and a lifetime software warranty.</p>}
        aside={
          <HeroPriceBox label={stage1.name} price={stage1.price} note="The exact price depends on your car.">
            <EnquiryButton choice={stage1.id} className="w-full min-h-[56px] text-[16px]" />
            <WhatsAppLink className="w-full min-h-[48px] text-white" />
          </HeroPriceBox>
        }
        promises={[
          "Custom Top Gear Tuning file",
          "Health check before and after",
          "Lifetime software warranty",
          "Pay on the day, when the job is done",
        ]}
      />

      <section className="relative isolate overflow-hidden bg-dark py-16 text-cream lg:py-24">
        <PowerCurve className="-right-28 top-10 -z-10 w-[440px] opacity-[0.14] lg:right-8 lg:w-[620px] lg:opacity-[0.18]" />
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
            <BandHeader tone="dark" eyebrow="Remaps" title="Remaps and prices" className="mb-0 lg:mb-0 lg:block" />
            <ul className="border-b border-white/10">
              {remapJobs.map((job) => (
                <JobRow key={job.id} anchor={job.id} tone="dark" {...job} />
              ))}
            </ul>
          </div>

          <ul className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {performanceTrust.map((item) => (
              <li key={item.title} className={cn(cardClass.dark, "p-6")}>
                <h3 className="text-[17px] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {bundle && (
        <Band tone="plum">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">Offer</p>
              <h2 className="mt-3 text-[clamp(1.9rem,6.4vw,2.875rem)] font-medium leading-[1.08] tracking-[-0.02em]">{bundle.title}</h2>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-white/80">{bundle.tagline} {bundle.saving?.headline}</p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <span className="self-start rounded-sm bg-plate px-3 py-1 text-[32px] font-bold leading-tight text-ink sm:self-auto">{formatOfferPrice(bundle)}</span>
              <Link href={`/offers#${bundle.slug}`} className="inline-flex min-h-[48px] items-center gap-2 px-2 text-[15px] font-semibold underline-offset-4 hover:underline">
                See the offer <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Band>
      )}

      <FaqSection tone="dark" title="Remapping: your questions." items={remapFaqs} />

      <FinalCall choice={stage1.id} />
    </>
  );
}
