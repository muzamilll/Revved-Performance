import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { guides, getGuide } from "../../../data/guides";
import { site } from "../../../data/site";
import { absoluteUrl, getSiteUrl } from "../../../lib/seo";
import { PageHero } from "../../../components/sections/PageHero";
import { Band, cardClass, cardInteractive } from "../../../components/sections/Band";
import { EnquiryButton } from "../../../components/enquiry/EnquiryButton";
import { WhatsAppLink } from "../../../components/ui/actions";
import { cn } from "../../../lib/utils";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { type: "article", title: guide.title, description: guide.description },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const others = guides.filter((g) => g.slug !== guide.slug).slice(0, 2);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.description,
    "datePublished": guide.published,
    "url": absoluteUrl(`/guides/${guide.slug}`),
    "author": { "@type": "Organization", "name": site.name, "url": getSiteUrl() },
    "publisher": { "@type": "Organization", "name": site.name, "@id": `${getSiteUrl()}/#business` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <PageHero
        crumb={guide.title}
        parents={[{ label: "Guides", href: "/guides" }]}
        chip={`${guide.category} · ${guide.readMinutes} min read`}
        title={guide.title}
        intro={<p>{guide.intro}</p>}
      />

      <Band>
        <article className="mx-auto max-w-[44rem]">
          {guide.sections.map((section) => (
            <section key={section.heading} className="mt-12 first:mt-0">
              <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-semibold leading-tight tracking-[-0.015em]">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 30)} className="mt-4 text-[17px] leading-[1.7] text-ink/85">{p}</p>
              ))}
              {section.list && (
                <ul className="mt-4 flex flex-col gap-2.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[17px] leading-[1.6] text-ink/85">
                      <Check className="mt-[5px] h-4 w-4 shrink-0 text-plum" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.after?.map((p) => (
                <p key={p.slice(0, 30)} className="mt-4 text-[17px] leading-[1.7] text-ink/85">{p}</p>
              ))}
            </section>
          ))}

          {/* The matching service, with a booking button */}
          <aside aria-label="Book this service" className="mt-14 overflow-hidden rounded-xl bg-plum text-white shadow-[0_24px_60px_-30px_rgba(105,60,86,0.9)]">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between lg:p-8">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">We can help</p>
                <p className="mt-2 text-[24px] font-semibold leading-snug tracking-[-0.01em]">
                  <Link href={guide.service.href} className="underline decoration-white/30 underline-offset-4 hover:decoration-white">{guide.service.name}</Link>
                </p>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/80">{guide.service.pitch}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                <span className="self-start rounded-sm bg-plate px-3 py-1 text-[26px] font-bold leading-tight text-ink sm:self-auto">{guide.service.price}</span>
                <EnquiryButton choice={guide.service.choiceId} className="min-h-[52px] px-6" />
              </div>
            </div>
            <p className="border-t border-white/15 px-6 py-4 text-[14px] text-white/80 lg:px-8">
              Not sure it&apos;s the right job?{" "}
              <WhatsAppLink plain icon={false} className="font-semibold text-white underline underline-offset-2">Ask us on WhatsApp</WhatsAppLink>.
            </p>
          </aside>
        </article>
      </Band>

      {others.length > 0 && (
        <Band className="border-t border-line">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-plum">More guides</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-5">
            {others.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className={cn(cardClass.cream, cardInteractive, "group flex h-full items-center justify-between gap-4 p-6 hover:border-ink/40")}>
                  <span className="text-[18px] font-semibold leading-snug tracking-[-0.01em]">{g.title}</span>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      )}
    </>
  );
}
