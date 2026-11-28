import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { WhatsAppLink } from "../ui/actions";
import { TrackView } from "../analytics/TrackView";
import { CareIcon } from "./CareIcon";
import { FaqSection, FinalCall, HowItWorks } from "./shared";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { PageHero, HeroPriceBox } from "./PageHero";
import { JobRow } from "./JobRow";
import { cn } from "../../lib/utils";
import { careCategories } from "../../data/care";
import { site } from "../../data/site";
import { absoluteUrl, areaServedLd, getSiteUrl } from "../../lib/seo";
import { getWhatsAppNumber } from "../../lib/whatsapp";
import { CareCategory } from "../../types";

// One car care category page. These are the ad landing pages: the price and the
// Get a quote button are in the first screen on a phone.
export function CategoryPage({ category }: { category: CareCategory }) {
  const primaryJob = category.jobs.find((j) => j.id === category.primaryJobId) ?? category.jobs[0];
  const others = careCategories.filter((c) => c.slug !== category.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": category.seoTitle,
    "description": category.seoDescription,
    "url": absoluteUrl(`/${category.slug}`),
    "provider": {
      "@type": "AutomotiveBusiness",
      "@id": `${getSiteUrl()}/#business`,
      "name": site.name,
      "telephone": `+${getWhatsAppNumber()}`,
      "url": getSiteUrl()
    },
    "areaServed": areaServedLd()
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": absoluteUrl("/") },
      { "@type": "ListItem", "position": 2, "name": category.name, "item": absoluteUrl(`/${category.slug}`) }
    ]
  };

  // FAQ markup mirrors the questions rendered on the page, word for word
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": category.faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };

  const batteries = category.slug === "batteries";

  return (
    <>
      <TrackView event="service_view" properties={{ service: category.slug }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <PageHero
        crumb={category.name}
        image={{ name: category.slug, alt: `${category.name} at your door with Revved Performance` }}
        chip={batteries ? "Day or night" : site.hoursDisplay}
        title={category.heroTitle}
        intro={<p>{category.heroIntro}</p>}
        aside={
          <HeroPriceBox label={category.heroLabel ?? primaryJob.name} price={category.heroPrice} note={category.heroPriceNote}>
            <EnquiryButton choice={primaryJob.id} timing={batteries ? "asap" : undefined} className="w-full min-h-[56px] text-[16px]" />
            <WhatsAppLink className="w-full min-h-[48px] text-white" />
          </HeroPriceBox>
        }
        promises={category.trustLine}
      />

      <Band>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <CareIcon slug={category.slug} className="h-10 w-10 text-plum" />
            <BandHeader eyebrow={category.name} title={category.jobsHeading} className="mt-5 mb-0 lg:mb-0" />
          </div>
          <ul className="border-b border-line">
            {category.jobs.map((job) => (
              <JobRow key={job.id} id={job.id} anchor={job.id} name={job.name} price={job.price} description={job.description} includes={job.includes} href={job.id === "pre-purchase-inspection" ? `/${category.slug}/${job.id}` : undefined} />
            ))}
          </ul>
        </div>
      </Band>

      <HowItWorks />

      <FaqSection title={`${category.name}: your questions.`} items={category.faqs} />

      <Band className="border-t border-line">
        <BandHeader eyebrow="More car care" title="Anything else while we're there?" />
        <ul className="grid gap-4 sm:grid-cols-3 lg:gap-5">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/${other.slug}`} className={cn(cardClass.cream, cardInteractive, "group flex min-h-[80px] items-center gap-4 px-5 py-4 hover:border-ink/40 hover:shadow-[0_12px_28px_-18px_rgba(26,20,24,0.5)]")}>
                <CareIcon slug={other.slug} className="h-8 w-8 shrink-0 text-plum" />
                <span className="flex flex-1 flex-col">
                  <span className="text-[17px] font-semibold tracking-[-0.01em]">{other.name}</span>
                  <span className="text-[13px] text-ink-soft">{other.cardPrice}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-ink-soft transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      <FinalCall choice={primaryJob.id} />
    </>
  );
}
