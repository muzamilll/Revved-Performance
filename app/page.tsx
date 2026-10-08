import { Metadata } from "next";
import Link from "next/link";
import { site } from "../data/site";
import { home } from "../data/home";
import { services } from "../data/services";
import { offers } from "../data/offers";
import { problems } from "../data/problems";
import { locations } from "../data/locations";
import { about } from "../data/about";
import { tunedBrands } from "../data/trust";
import { reviews } from "../data/reviews";
import { absoluteUrl, getSiteUrl } from "../lib/seo";
import { cn } from "../lib/utils";

import { BadgeCheck, ClipboardCheck, MapPin, ShieldCheck } from "lucide-react";
import { Container, Section, SectionHeading } from "../components/layout/layout-primitives";
import { Reveal } from "../components/ui/Reveal";
import { ServiceAreaMap } from "../components/home/ServiceAreaMap";
import { RevealPhotoSection } from "../components/home/RevealPhotoSection";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/ui-primitives";
import { Img } from "../components/ui/Img";
import { WhatsAppButton } from "../components/ui/WhatsAppButton";
import { VehicleLookup } from "../components/home/VehicleLookup";
import { ProblemSelector } from "../components/home/ProblemSelector";
import { ServiceGroups } from "../components/services/ServiceGroups";
import { EcuTrust } from "../components/home/EcuTrust";
import { warranty } from "../data/warranty";
import { LaunchSignup } from "../components/home/LaunchSignup";
import { LaunchSlots, isLaunchOfferRunning } from "../components/ui/ServicePrice";
import { launchOffer } from "../data/launch-offer";
import { getVisibleOffers, getOfferSavings } from "../lib/offers";

export const metadata: Metadata = {
  title: {
    absolute: site.homeTitle,
  },
  description: site.homeDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  const visibleOffers = getVisibleOffers(offers, services);
  const featuredOffer = visibleOffers.find(o => o.featured);

  const verifiedTrust = tunedBrands.filter(t => t.verified);
  // Sign-up only renders when Brevo is configured and the launch offer is running.
  const showLaunchSignup = Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID) && isLaunchOfferRunning();

  const heroPoints = [
    { icon: BadgeCheck, title: "Top Gear Tuning", sub: "Verified Dealer" },
    { icon: ShieldCheck, title: warranty.name, sub: null },
    { icon: MapPin, title: "Mobile Service", sub: "We come to you" },
    { icon: ClipboardCheck, title: "Pre & Post", sub: "Diagnostics" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": site.name,
    "url": getSiteUrl(),
    "logo": absoluteUrl("/images/revved-logo.png"),
    "email": site.social.email,
    "legalName": site.company.legalName,
    // Mobile business: town only, no street address (registered office is not a trading address)
    "address": {
      "@type": "PostalAddress",
      "addressLocality": site.baseTown,
      "addressCountry": "GB"
    },
    "telephone": process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447999200655",
    "areaServed": locations.map(l => l.name).join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Cinematic Hero: plain <section> (not <Section>) so the photo fills the whole box, including the area behind the fixed header */}
      <section className="relative isolate overflow-hidden flex flex-col lg:min-h-[88vh]">
        <div
          className="absolute inset-x-0 top-0 h-[100vw] md:h-auto md:inset-0 -z-10 bg-cover bg-[position:50%_60%] md:bg-[position:58%_62%] lg:bg-[position:center_62%]"
          style={{ backgroundImage: "url('/images/hero-r8.webp')" }}
          aria-hidden="true"
        />
        {/* Overlays: overall dim, dark top for the header, dark left for the copy (desktop), fade into the page at the bottom */}
        <div className="absolute inset-0 -z-10 bg-background/25 md:bg-background/55 lg:bg-background/35" aria-hidden="true" />
        {/* Mobile: fade the bottom of the photo box into the page */}
        <div className="absolute inset-x-0 top-0 h-[100vw] -z-10 md:hidden bg-gradient-to-b from-transparent from-60% to-background" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-40 -z-10 bg-gradient-to-b from-background/90 to-transparent" aria-hidden="true" />
        <div className="absolute inset-y-0 left-0 w-2/3 -z-10 hidden lg:block bg-gradient-to-r from-background/90 via-background/60 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 lg:h-1/2 -z-10 hidden md:block bg-gradient-to-t from-background via-background/70 to-transparent" aria-hidden="true" />

        {/* Top padding clears the fixed header (h-20); on mobile it starts the copy just under the car */}
        <Container className="flex-1 flex flex-col justify-center pt-[calc(100vw-6rem)] pb-8 md:pt-36 md:pb-12 lg:pt-32">
          <div>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] max-[380px]:text-[11px] max-[380px]:tracking-[0.08em] text-accent-light mb-4">
              Mobile Tuning · East London · Essex
            </p>

            <h1 className="text-[2.6rem] min-[400px]:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-heading font-extrabold text-white leading-[0.95] uppercase tracking-tight mb-5 lg:whitespace-nowrap">
              Mobile ECU Remapping &amp;<br />
              <span className="text-accent-light">Performance Tuning</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/80 mb-8 max-w-xl">
              Professional ECU &amp; TCU tuning across East London &amp; Essex.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <WhatsAppButton label="Get a quote" className="w-full sm:w-auto h-14 px-8 text-base md:text-lg uppercase tracking-wider font-bold" />
              <Button href="#check-my-car" variant="secondary" className="w-full sm:w-auto h-14 px-8 text-base md:text-lg uppercase tracking-wider font-bold bg-background/40 backdrop-blur-sm">
                Check your car
              </Button>
            </div>
          </div>
        </Container>

        {/* Value / trust strip */}
        <Container className="pb-8 md:pb-12">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-5 border-t border-white/10 pt-6">
            {heroPoints.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex items-start gap-3 min-w-0">
                <Icon className="w-5 h-5 mt-0.5 text-accent-light flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs md:text-sm font-bold uppercase tracking-wider text-white leading-snug">{title}</p>
                  {sub && <p className="text-xs md:text-sm text-muted">{sub}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 2. Horizontal Special Offer Banner */}
      {featuredOffer && (
        <div className="w-full bg-gradient-accent border-b border-border glow-plum relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
          <Container className="relative z-10 py-6 md:py-8">
            <Reveal>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                
                {/* Left: Eyebrow + Title + Pricing */}
                <div className="w-full lg:w-auto">
                  <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">Limited Offer</div>
                  <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight leading-none">
                      {featuredOffer.title}
                    </h2>
                    
                    <div className="flex items-center gap-4 mt-2 md:mt-0 opacity-90">
                       {featuredOffer.price && (
                         <div className="text-2xl md:text-3xl font-bold text-white leading-none">
                           {featuredOffer.price.from && <span className="text-sm uppercase tracking-widest mr-2 opacity-80">From</span>}
                           £{featuredOffer.price.amount}
                         </div>
                       )}
                       {getOfferSavings(featuredOffer, services) && (
                         <div className="text-sm font-bold text-white bg-white/20 px-2 py-1 rounded-sm uppercase tracking-wider leading-none">
                           Save £{getOfferSavings(featuredOffer, services)}
                         </div>
                       )}
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="w-full lg:w-auto flex flex-col items-start lg:items-end gap-2">
                   <Button href={`/offers/${featuredOffer.slug}`} className="bg-white text-brand-plum hover:bg-muted font-bold uppercase tracking-widest w-full lg:w-auto h-12 md:h-14 md:px-8">
                     Claim This Offer &rarr;
                   </Button>
                   <p className="text-[10px] text-white/70 uppercase tracking-widest pl-1 lg:pl-0">Vehicle eligibility applies.</p>
                </div>

              </div>
            </Reveal>
          </Container>
        </div>
      )}

      {/* 3. Trust Strip */}
      {verifiedTrust.length > 0 && (
        <div className="w-full section-tone-sunk border-b border-border py-6 md:py-8 overflow-hidden">
          <Container>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-12">
               <span className="text-xs font-bold text-muted uppercase tracking-[0.2em] whitespace-nowrap">
                 We tune vehicles from
               </span>
               {/* Auto-scrolling strip: no touch scrolling, so it can't be dragged up/down on phones */}
               <div className="flex-1 w-full overflow-hidden mask-edges touch-pan-y" aria-label={verifiedTrust.map(t => t.label).join(", ")}>
                 <div className="flex w-max animate-marquee opacity-60" aria-hidden="true">
                    {[0, 1].map(copy => (
                      <div key={copy} className="flex items-center gap-10 md:gap-14 pr-10 md:pr-14">
                        {verifiedTrust.map(t => (
                          <div key={t.id} className={cn("relative flex-shrink-0 flex items-center justify-center", t.logoSrc ? "w-9 h-9 md:w-11 md:h-11" : "h-6 md:h-8")}>
                            {t.logoSrc ? (
                              <Img src={t.logoSrc} alt={t.alt || t.label} fill sizes="44px" className="object-contain" />
                            ) : (
                              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-muted whitespace-nowrap">{t.label}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                 </div>
               </div>
               <span className="text-xs font-bold text-muted uppercase tracking-[0.2em] whitespace-nowrap">
                 And many more
               </span>
            </div>
          </Container>
        </div>
      )}

      {/* 4. Services (Premium Grid) */}
      <Section id="services" className="section-tone-glow relative">
        <Container>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border pb-6 gap-4">
              <div>
                <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-2">Our Services</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
                  Professional<br/><span className="text-accent-light">Automotive Care.</span>
                </h2>
              </div>
              <Link href="/services" className="text-accent-light font-bold uppercase tracking-wider text-sm hover:text-white transition-colors">
                View All Services &rarr;
              </Link>
            </div>

            <ServiceGroups services={services} />
          </Reveal>
        </Container>
      </Section>

      {/* Why your ECU is safe with us */}
      <Section id="ecu-safe" className="border-t border-border section-tone-raised">
        <Container>
          <Reveal>
            <EcuTrust data={home.ecuTrust} />
          </Reveal>
        </Container>
      </Section>

      {/* How it works */}
      <Section id="how-it-works" className="border-t border-border section-tone-sunk">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Booking takes a few minutes." />
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {home.howItWorks.map(item => (
                <li key={item.step} className="flex gap-4 p-6 rounded-xl bg-background border border-border">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent-light font-heading font-bold">
                    {item.step}
                  </div>
                  <p className="text-lg text-muted pt-1.5">{item.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      {/* Launch offer email sign-up */}
      {showLaunchSignup && (
        <Section id="launch-offer" className="border-t border-border section-tone-glow">
          <Container>
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
              <div>
                <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-2">{launchOffer.label}</p>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
                  Get our<br/><span className="text-accent-light">launch prices.</span>
                </h2>
                <p className="text-muted text-lg mb-4">
                  Pop your email in to claim one of our launch slots. We&apos;ll show you the offer straight away.
                </p>
                <LaunchSlots />
              </div>
              <LaunchSignup />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 5. Split-Screen Vehicle Lookup */}
      <Section id="check-my-car" className="p-0 md:p-0 border-y border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Cinematic Background */}
          <div className="hidden lg:block relative min-h-[500px] bg-surface">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1500&auto=format&fit=crop')] bg-cover bg-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700"></div>
             <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
          </div>

          {/* Right: The Lookup Form */}
          <div className="bg-background py-20 px-6 lg:px-20 flex flex-col justify-center">
            <Reveal>
              <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-2">Check Compatibility</p>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
                What can we do<br/>for your car?
              </h2>
              <p className="text-muted mb-8 text-lg">
                Enter your vehicle registration and we&apos;ll check what services are available for your specific engine.
              </p>
              
              <div className="max-w-md">
                <VehicleLookup />
              </div>
              
              <div className="mt-8 pt-8 border-t border-border flex flex-col gap-4">
                <p className="text-sm text-muted">
                  Not sure? No problem. <strong className="text-white">Prefer WhatsApp?</strong> Send us your registration and we&apos;ll check it for you.
                </p>
                <WhatsAppButton variant="secondary" className="w-full sm:w-auto self-start uppercase tracking-wider font-bold text-xs" label="Chat on WhatsApp" />
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 6. Problem Selector */}
      <Section className="section-tone-raised border-b border-border">
        <Container>
          <Reveal>
             <SectionHeading 
              eyebrow="Diagnostics" 
              title="What is happening with your car?" 
              intro="Select the issue you're facing and we'll recommend the right diagnostic approach." 
            />
            <div className="max-w-4xl">
              <ProblemSelector problems={problems} services={services} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 7. New to tuning / Glossary */}
      {home.newToTuning && (home.newToTuning.explainer || (home.newToTuning.glossary && home.newToTuning.glossary.length > 0)) && (
        <Section className="border-b border-border section-tone-sunk">
          <Container>
            <Reveal>
              <div className="max-w-4xl">
                {home.newToTuning.explainer && (
                  <div className="mb-12">
                    <h2 className="text-3xl font-heading font-bold text-white mb-6 uppercase tracking-tight">New to tuning?</h2>
                    <div className="prose prose-invert prose-lg max-w-none text-muted">
                      {home.newToTuning.explainer.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
                    </div>
                  </div>
                )}
                
                {home.newToTuning.glossary && home.newToTuning.glossary.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-accent-light mb-6 uppercase tracking-[0.2em]">Plain English Glossary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {home.newToTuning.glossary.map((item, i) => (
                        <div key={i} className="pb-4 border-b border-thin/50">
                          <strong className="text-white block mb-1 uppercase tracking-wider text-sm">{item.term}</strong>
                          <span className="text-sm text-muted">{item.definition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 8. About (Cinematic) */}
      {about && (
        <RevealPhotoSection
          id="about"
          className="border-b border-border text-center"
          image="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2000&auto=format&fit=crop"
          // Keep the hand and spanner (right of centre in the photo) in frame on narrow screens
          imagePosition="bg-[position:66%_45%] md:bg-[position:center_45%]"
        >
          <Container className="py-12">
            <Reveal>
              <div className="max-w-3xl mx-auto">
                <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-4">About Revved Performance</p>
                <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-8 uppercase tracking-tighter text-glow-accent">
                  Passion drives<br/>everything we do.
                </h2>
                <div className="prose prose-invert text-muted mx-auto mb-12 text-lg">
                  {about.body.split('\n').map((p, i) => p.trim() && <p key={i}>{p}</p>)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
                  {home.whyRevved.map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 mx-auto rounded-full bg-accent/20 flex items-center justify-center text-accent-light mb-3 border border-accent/30">
                        ✓
                      </div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">{item.title}</h4>
                      <p className="text-[10px] text-muted uppercase">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </Container>
        </RevealPhotoSection>
      )}

      {/* 9. Reviews */}
      {reviews && reviews.length > 0 && (
        <Section className="border-b border-border section-tone-glow">
          <Container>
            <Reveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border pb-6 gap-4">
                <div>
                  <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-2">What our customers say</p>
                  <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight">
                    Real Drivers.<br/><span className="text-muted">Real Results.</span>
                  </h2>
                </div>
                <div className="flex items-center gap-4 bg-surface px-4 py-2 rounded-full border border-thin">
                   <span className="text-sm font-bold text-white">4.9 out of 5</span>
                   <div className="flex text-accent-light">★★★★★</div>
                   <span className="text-xs text-muted uppercase tracking-wider">{reviews.length}+ reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                  <Card key={review.id} className="bg-background border-thin p-8 hover:border-accent/50 transition-colors">
                    <p className="text-muted mb-8 text-sm leading-relaxed min-h-[80px]">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex justify-between items-center text-sm border-t border-thin/50 pt-4 mt-auto">
                      <div className="flex flex-col">
                        <div className="flex text-accent-light mb-1 text-xs">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                          ))}
                        </div>
                        <strong className="text-white uppercase tracking-wider text-xs">{review.author}</strong>
                        <span className="text-[10px] text-muted uppercase tracking-widest mt-1">Verified Customer</span>
                      </div>
                      <span className="text-[10px] text-muted uppercase tracking-widest px-2 py-1 bg-surface rounded-sm">{review.source}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 10. Map / Service Areas */}
      {locations && locations.length > 0 && (
        <Section id="locations" className="border-b border-border section-tone-raised">
          <Container>
            <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-end mb-10 md:mb-14">
              <div>
                <p className="text-accent-light text-sm font-bold uppercase tracking-[0.2em] mb-4">Areas we cover</p>
                <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight leading-none">
                  East London, Essex<br/><span className="text-muted">& Surrounding Areas.</span>
                </h2>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Towns we cover">
                {locations.map(loc => (
                  <li
                    key={loc.slug}
                    className={cn(
                      "rounded-full border px-3 py-1 text-[11px] md:text-xs font-medium uppercase tracking-wider",
                      loc.name === site.baseTown
                        ? "border-accent/60 bg-accent/20 text-white"
                        : "border-thin bg-surface/40 text-muted"
                    )}
                  >
                    {loc.name}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <ServiceAreaMap />
            </Reveal>
          </Container>
        </Section>
      )}

      {/* 11. Final CTA */}
      <Section className="border-b border-border relative overflow-hidden py-32" backgroundImage="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2500&auto=format&fit=crop" overlay>
        <Container>
          <Reveal>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 uppercase tracking-tighter text-glow-accent">
                Ready to rev it up?
              </h2>
              <p className="text-sm md:text-lg text-muted mb-12 uppercase tracking-widest font-bold">
                Tell us what you drive. We&apos;ll take it from there.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="#check-my-car" variant="primary" className="w-full sm:w-auto text-lg h-14 px-8 uppercase tracking-wider font-bold">
                  Get a Quote &rarr;
                </Button>
                <WhatsAppButton className="w-full sm:w-auto text-lg h-14 px-8 uppercase tracking-wider font-bold" variant="secondary" label="Chat on WhatsApp" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
