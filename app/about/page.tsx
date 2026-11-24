import { Metadata } from "next";
import { about } from "../../data/about";
import { site } from "../../data/site";
import { PageHero } from "../../components/sections/PageHero";
import { Band, BandHeader, cardClass } from "../../components/sections/Band";
import { FinalCall } from "../../components/sections/shared";
import { WhatsAppLink } from "../../components/ui/actions";
import { cn } from "../../lib/utils";

export const metadata: Metadata = {
  title: "About Revved",
  description: "Revved Performance is a mobile car service and ECU tuning company covering East London and Essex, 7am to midnight. An authorised Top Gear Tuning agent.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        chip={site.serviceAreaSummary}
        title={about.title}
        intro={<p>{about.intro}</p>}
        promises={[
          "Price agreed before we start",
          "At your home or work",
          "Top Gear Tuning agent",
          "Registered UK company",
        ]}
      />

      <Band>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-16">
          <div>
            <BandHeader eyebrow="Why Revved" title="The garage, without the garage." className="lg:mb-8" />
            <div className="flex max-w-2xl flex-col gap-5 text-[17px] leading-relaxed text-ink-soft">
              {about.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="flex flex-col gap-4 lg:pt-16">
            {about.values.map((v) => (
              <li key={v.title} className={cn(cardClass.cream, "p-6")}>
                <h3 className="text-[18px] font-semibold tracking-[-0.01em]">{v.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Band>

      <Band className="border-t border-line">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
          <BandHeader eyebrow="Company details" title="Who you're dealing with." className="mb-0 lg:mb-0" />
          <dl className={cn(cardClass.cream, "divide-y divide-line text-[15px]")}>
            {[
              ["Company", site.company.legalName],
              ["Company number", site.company.number],
              ["Registered in", site.company.registeredIn],
              ["Registered office", site.company.registeredOffice],
              ["Phone and WhatsApp", site.phoneDisplay],
              ["Email", site.social.email],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-ink-soft">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-6 text-[14px] text-ink-soft">
          The registered office is for post only. We&apos;re a mobile service, so we come to you.{" "}
          <WhatsAppLink plain icon={false} className="font-semibold text-plum underline underline-offset-2">Ask us anything on WhatsApp</WhatsAppLink>.
        </p>
      </Band>

      <FinalCall />
    </>
  );
}
