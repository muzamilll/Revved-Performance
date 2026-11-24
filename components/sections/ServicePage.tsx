import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { WhatsAppLink } from "../ui/actions";
import { TrackView } from "../analytics/TrackView";
import { PageHero, HeroPriceBox } from "./PageHero";
import { Band, BandHeader, cardClass, cardInteractive } from "./Band";
import { FaqSection, FinalCall, HowItWorks } from "./shared";
import { site } from "../../data/site";
import { locations } from "../../data/locations";
import { absoluteUrl, getSiteUrl } from "../../lib/seo";
import { getWhatsAppNumber } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

export type ServicePageJob = {
  id: string;
  name: string;
  price: string;
  description: string;
  includes?: string[];
  note?: string;
};

// One page per bookable job. Same structure for car care (plum) and Performance (dark).
export function ServicePage({
  job,
  tone,
  parent,
  priceNote,
  faqs,
  siblings,
  path,
}: {
  job: ServicePageJob;
  tone: "plum" | "dark";
  parent: { label: string; href: string };
  priceNote?: string;
  faqs: { question: string; answer: string }[];
  siblings: (ServicePageJob & { href: string })[];
  path: string;
}) {
  const dark = tone === "dark";
  const amount = Number(job.price.replace(/[^0-9.]/g, "")) || undefined;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": job.name,
    "description": job.description,
    "url": absoluteUrl(path),
    "provider": { "@type": "AutomotiveBusiness", "@id": `${getSiteUrl()}/#business`, "name": site.name, "telephone": `+${getWhatsAppNumber()}`, "url": getSiteUrl() },
    "areaServed": locations.map((l) => ({ "@type": "City", "name": l.name })),
    ...(amount ? { "offers": { "@type": "Offer", "price": amount, "priceCurrency": "GBP" } } : {}),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": absoluteUrl("/") },
      { "@type": "ListItem", "position": 2, "name": parent.label, "item": absoluteUrl(parent.href) },
      { "@type": "ListItem", "position": 3, "name": job.name, "item": absoluteUrl(path) },
    ],
  };

  return (
    <>
      <TrackView event="service_view" properties={{ service: job.id }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <PageHero
        tone={tone}
        parents={[parent]}
        crumb={job.name}
        chip={site.serviceAreaSummary}
        title={job.name}
        intro={<p>{job.description}</p>}
        aside={
          <HeroPriceBox label={job.name} price={job.price} note={priceNote}>
            <EnquiryButton choice={job.id} className="w-full min-h-[56px] text-[16px]" />
            <WhatsAppLink className="w-full min-h-[48px] text-white" />
          </HeroPriceBox>
        }
        promises={[
          "Price agreed before you book",
          "At your home or work",
          `${site.hoursDisplay}, every day`,
          "Pay on the day, when the job is done",
        ]}
      />

      {(job.includes?.length || job.note) && (
        <Band tone={dark ? "dark" : "cream"}>
          <BandHeader tone={dark ? "dark" : "cream"} eyebrow={job.name} title="What's included" />
          {job.includes && job.includes.length > 0 && (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {job.includes.map((item) => (
                <li key={item} className={cn(dark ? cardClass.dark : cardClass.cream, "flex items-start gap-3 p-5 text-[16px]")}>
                  <Check className={cn("mt-0.5 h-5 w-5 shrink-0", dark ? "text-plate" : "text-plum")} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {job.note && <p className={cn("mt-6 max-w-2xl text-[14px] leading-relaxed", dark ? "text-white/70" : "text-ink-soft")}>{job.note}</p>}
        </Band>
      )}

      <HowItWorks />

      {faqs.length > 0 && <FaqSection tone={dark ? "dark" : "cream"} title="Your questions." items={faqs} />}

      {siblings.length > 0 && (
        <Band tone={dark ? "dark" : "cream"} className={dark ? "border-t border-white/10" : "border-t border-line"}>
          <BandHeader tone={dark ? "dark" : "cream"} eyebrow={parent.label} title={`More from ${parent.label.toLowerCase()}`} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link
                  href={s.href}
                  className={cn(dark ? cardClass.dark : cardClass.cream, cardInteractive, "group flex min-h-[80px] items-center gap-4 px-5 py-4", dark ? "hover:border-white/30" : "hover:border-ink/40")}
                >
                  <span className="flex flex-1 flex-col">
                    <span className="text-[17px] font-semibold tracking-[-0.01em]">{s.name}</span>
                    <span className={cn("text-[14px]", dark ? "text-white/70" : "text-ink-soft")}>{s.price}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      )}

      <FinalCall choice={job.id} />
    </>
  );
}
