import * as React from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Container } from "../layout/layout-primitives";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { TrackedAnchor } from "../analytics/TrackedAnchor";
import { Reveal } from "../ui/Reveal";
import { howItWorks } from "../../data/care";
import { site } from "../../data/site";
import { getPhoneUrl } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

// Small uppercase label above a heading. On cream it is plum; on plum or dark, plum tint.
export function Eyebrow({ children, tone = "cream", className }: { children: React.ReactNode; tone?: "cream" | "plum" | "dark"; className?: string }) {
  return (
    <p className={cn("text-[12px] font-bold uppercase tracking-[0.18em]", tone === "cream" ? "text-plum" : "text-plum-tint", className)}>
      {children}
    </p>
  );
}

// Section heading for information sections: Inter, not Anton (Anton is kept for the poster moments)
export function Heading({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={cn("text-[clamp(1.9rem,6.4vw,2.875rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance", className)}>
      {children}
    </Tag>
  );
}

// Promise band (plum): the four things Revved commits to
export function PromiseBand({ items }: { items: string[] }) {
  return (
    <section aria-label="Our promises" className="bg-plum text-white">
      <Container>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-3 py-5 text-[12px] font-bold uppercase leading-snug tracking-[0.12em] lg:grid-cols-4 lg:gap-6 lg:py-6 xl:flex xl:items-center xl:justify-between xl:tracking-[0.16em]">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span aria-hidden="true" className="mt-[0.3em] h-1.5 w-1.5 shrink-0 rounded-full bg-plate" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// Three steps (cream). Wording follows the brief: "Get started in a minute", pay on the day.
export function HowItWorks({ className }: { className?: string }) {
  return (
    <section className={cn("bg-cream-deep text-ink py-16 lg:py-24", className)}>
      <Container>
        <Reveal>
          <Eyebrow>How it works</Eyebrow>
          <Heading className="mt-3">Get started in a minute.</Heading>
          <ol className="mt-9 grid gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-0">
            {howItWorks.map((item, i) => (
              <li key={item.title} className={cn("flex gap-4 lg:flex-col lg:gap-3 lg:px-8", i === 0 ? "lg:pl-0" : "lg:border-l lg:border-line")}>
                <span aria-hidden="true" className="w-6 shrink-0 font-accent text-[30px] italic leading-none text-plum">{i + 1}</span>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}

// Questions (cream). Native <details>, so it works without JavaScript.
export function FaqSection({
  id,
  eyebrow = "Questions",
  title,
  items,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <section id={id} className={cn("bg-cream text-ink py-16 lg:py-24", className)}>
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading className="mt-3">{title}</Heading>
          </div>
          <div className="border-b border-line">
            {items.map((item) => (
              <details key={item.question} className="group border-t border-line">
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold tracking-[-0.005em]">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-plum transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// Final call (plum). One of the three places Anton appears.
export function FinalCall({ choice, buttonLabel = "Get a quote" }: { choice?: string; buttonLabel?: string }) {
  return (
    <section className="bg-plum text-white py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-plum-tint">Your day doesn&apos;t need a detour.</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,calc((100vw-3rem)/6.75),7.5rem)] uppercase leading-[0.96] tracking-[0.005em]">
            We come to you.
          </h2>
          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <EnquiryButton choice={choice} className="w-full min-h-[56px] px-8 text-[16px] sm:w-auto">{buttonLabel}</EnquiryButton>
            <TrackedAnchor
              href={getPhoneUrl()}
              event="phone_click"
              className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-white px-8 text-[16px] font-bold transition-colors hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call {site.phoneDisplay}
            </TrackedAnchor>
          </div>
          <p className="mt-5 text-[14px] text-mist">Price agreed before you book. You pay on the day, when the job is done.</p>
        </Reveal>
      </Container>
    </section>
  );
}
