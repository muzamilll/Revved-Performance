import Link from "next/link";
import { ArrowRight, Check, Phone } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { TrackedAnchor } from "../analytics/TrackedAnchor";
import { TrackView } from "../analytics/TrackView";
import { Reveal } from "../ui/Reveal";
import { CareIcon } from "./CareIcon";
import { Eyebrow, FaqSection, FinalCall, Heading, HowItWorks, PromiseBand } from "./shared";
import { careCategories } from "../../data/care";
import { locations } from "../../data/locations";
import { site } from "../../data/site";
import { absoluteUrl, getSiteUrl } from "../../lib/seo";
import { getPhoneUrl, getWhatsAppNumber } from "../../lib/whatsapp";
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
    "areaServed": locations.map(l => ({ "@type": "City", "name": l.name }))
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

  return (
    <>
      <TrackView event="service_view" properties={{ service: category.slug }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Hero (plum) */}
      <section className="bg-plum-hero text-white lg:bg-[linear-gradient(to_bottom,var(--color-plum-hero),var(--color-plum-hero-end))]">
        <Container className="pt-6 pb-10 lg:pt-12 lg:pb-16">
          <nav aria-label="Breadcrumb" className="hero-rise text-[13px] text-mist" style={{ "--i": 0 } as React.CSSProperties}>
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-white hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">{category.name}</li>
            </ol>
          </nav>

          <div className="mt-2 grid gap-8 lg:mt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-end lg:gap-16">
            <div>
              <p className="hero-rise flex flex-wrap items-center gap-x-3.5 gap-y-2" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                  {category.slug === "batteries" ? "Day or night" : site.hoursDisplay}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-plum-tint">{site.serviceAreaSummary}</span>
              </p>
              <h1 className="hero-rise mt-4 max-w-[17ch] text-[clamp(2.25rem,9.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-balance" style={{ "--i": 2 } as React.CSSProperties}>
                {category.heroTitle}
              </h1>
              <p className="hero-rise mt-4 max-w-[34rem] text-[17px] leading-relaxed text-mist lg:text-[18px]" style={{ "--i": 3 } as React.CSSProperties}>
                {category.heroIntro}
              </p>
            </div>

            <div className="hero-rise border border-white/20 bg-white/[0.06] p-5 lg:p-6" style={{ "--i": 4 } as React.CSSProperties}>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum-tint">{primaryJob.name}</p>
              <p className="mt-1.5 text-[30px] font-bold leading-tight tracking-[-0.02em] text-plate lg:text-[34px]">{category.heroPrice}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-mist">{category.heroPriceNote}</p>
              <div className="mt-5 flex flex-col gap-2.5">
                <EnquiryButton choice={primaryJob.id} timing={category.slug === "batteries" ? "asap" : undefined} className="w-full min-h-[56px] text-[16px]">
                  Get a quote
                </EnquiryButton>
                <TrackedAnchor
                  href={getPhoneUrl()}
                  event="phone_click"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-white text-[15px] font-bold transition-colors hover:bg-white/10"
                >
                  <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                  Call {site.phoneDisplay}
                </TrackedAnchor>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PromiseBand
        items={[
          "Price agreed before you book",
          "At your home or work",
          category.slug === "batteries" ? "3-year battery warranty" : `${site.hoursDisplay}, every day`,
          "Pay on the day, when the job is done",
        ]}
      />

      {/* Jobs and prices (cream) */}
      <section className="bg-cream text-ink py-16 lg:py-24">
        <Container>
          <Reveal className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-14">
            <div>
              <CareIcon slug={category.slug} className="h-10 w-10 text-plum" />
              <Eyebrow className="mt-5">{category.name}</Eyebrow>
              <Heading className="mt-3">{category.jobsHeading}</Heading>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Choose a job to start a request with it selected. We confirm the full price for your car on WhatsApp before you book.
              </p>
            </div>

            <ul className="border-b border-line">
              {category.jobs.map((job) => (
                <li key={job.id} className="grid gap-x-6 gap-y-4 border-t border-line py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                  <div>
                    <h3 className="text-[20px] font-semibold tracking-[-0.01em]">{job.name}</h3>
                    <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink-soft">{job.description}</p>
                    {job.includes && (
                      <ul className="mt-3 grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
                        {job.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check className="mt-[3px] h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 sm:flex-col sm:flex-nowrap sm:items-end">
                    <p className="bg-plate px-2.5 py-1 text-[18px] font-bold leading-tight tracking-[-0.01em] whitespace-nowrap">{job.price}</p>
                    <EnquiryButton
                      variant="secondary"
                      choice={job.id}
                      aria-label={`Get a quote for ${job.name}`}
                      className="min-h-[48px] px-5 text-plum hover:bg-plum/10"
                    >
                      Get a quote
                    </EnquiryButton>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <HowItWorks />

      <FaqSection title={`${category.name}: your questions.`} items={category.faqs} />

      {/* Other car care (cream) */}
      <section className="bg-cream-deep text-ink py-14 lg:py-16">
        <Container>
          <Eyebrow>More car care</Eyebrow>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${other.slug}`}
                  className="group flex min-h-[72px] items-center gap-4 border border-line bg-cream px-5 py-4 transition-colors hover:border-ink/50"
                >
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
        </Container>
      </section>

      <FinalCall choice={primaryJob.id} />
    </>
  );
}
