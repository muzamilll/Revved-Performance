import { Metadata } from "next";
import { remapJobs, performanceTrustLine } from "../../data/performance";
import { remapFaqs } from "../../data/warranty";
import { offers } from "../../data/offers";
import { site } from "../../data/site";
import { getOffersForDisplay } from "../../lib/offers";
import { absoluteUrl, areaServedLd, getSiteUrl } from "../../lib/seo";
import { getWhatsAppNumber } from "../../lib/whatsapp";
import { EnquiryButton } from "../../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../../components/ui/actions";
import { TrackView } from "../../components/analytics/TrackView";
import { PageHero, HeroPriceBox } from "../../components/sections/PageHero";
import { BandHeader } from "../../components/sections/Band";
import { JobRow } from "../../components/sections/JobRow";
import { BundleCard, GainsByReg } from "../../components/sections/BundleOffer";
import { FaqSection, FinalCall } from "../../components/sections/shared";

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
    "areaServed": areaServedLd(),
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
        image={{ name: "performance", alt: "ECU remapping at your door with Revved Performance" }}
        chip="Top Gear Tuning agent"
        title="More from your car."
        intro={<p>ECU and gearbox remapping at your home or work, with a file written for your engine and a lifetime software warranty.</p>}
        aside={
          <HeroPriceBox label={stage1.name} price={stage1.price} note="The exact price depends on your car.">
            <EnquiryButton choice={stage1.id} className="w-full min-h-[56px] text-[16px]" />
            <WhatsAppLink className="w-full min-h-[48px] text-white" />
          </HeroPriceBox>
        }
        promises={performanceTrustLine}
      />

      <section className="relative isolate overflow-hidden bg-dark py-16 text-cream lg:py-24">
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
            <BandHeader tone="dark" eyebrow="Remaps" title="Remaps and prices" className="mb-0 lg:mb-0 lg:block" />
            <ul className="border-b border-white/10">
              {remapJobs.map((job) => (
                <JobRow key={job.id} anchor={job.id} tone="dark" href={`/performance/${job.id}`} {...job} />
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* The bundle as a receipt, and the send-your-reg step */}
      <section className="bg-dark pb-16 text-cream lg:pb-24">
        <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16 lg:px-12">
          {bundle ? <BundleCard offer={bundle} /> : null}
          <GainsByReg />
        </div>
      </section>

      <FaqSection tone="dark" title="Remapping: your questions." items={remapFaqs} />

      <FinalCall choice={stage1.id} />
    </>
  );
}
