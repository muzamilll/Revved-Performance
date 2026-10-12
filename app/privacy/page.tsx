import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { site } from "../../data/site";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { Container, Section } from "../../components/layout/layout-primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: {
    index: false,
    follow: true,
  },
};

const link = "text-accent-light hover:text-white underline underline-offset-4";

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wide mt-8 mb-3">{children}</h3>;
}

function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-light">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

// Still to be filled in before this policy is final
function ToConfirm({ children }: { children: ReactNode }) {
  return <mark className="bg-accent/20 text-white rounded px-1">[To confirm: {children}]</mark>;
}

export default function PrivacyPage() {
  const { company } = site;
  const email = site.social.email;

  return (
    <Section>
      <Container className="max-w-3xl text-muted leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">Privacy Policy</h1>
        <p className="mb-8">Last updated: <ToConfirm>date this is published</ToConfirm></p>

        <H3>Who we are</H3>
        <p className="mb-3">
          {company.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), trading as {site.name}, is a mobile automotive
          service covering {site.baseTown}, East London and Essex. We&apos;re registered in {company.registeredIn} (company no.{" "}
          {company.number}). Registered office: {company.registeredOffice}.
        </p>
        <p>
          For any question about this policy or your data, contact us on WhatsApp at{" "}
          <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className={link}>+44 7999 200 655</a>, or by
          email at <a href={`mailto:${email}`} className={link}>{email}</a>.
        </p>

        <H3>What we collect, and why</H3>
        <p className="mb-3">
          <strong className="text-white">When you message us on WhatsApp.</strong> If you contact us about a quote or booking, we
          see what you send us, which may include your name, vehicle registration and vehicle details, and your WhatsApp contact
          details. We use this to respond to your enquiry and arrange any work you book. This is handled within WhatsApp, which is
          operated by Meta; see{" "}
          <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={link}>
            WhatsApp&apos;s privacy policy
          </a>{" "}
          for how they handle messages on their platform. We keep enough of this conversation to carry out the work and for our
          own basic business records, and no longer than that.
        </p>
        <p className="mb-3">
          <strong className="text-white">If you sign up for offers.</strong> If you give us your email (and optionally your phone
          number) to hear about our offers, we use it to send you offers and updates by email. We only do this with your consent,
          given when you tick the box on the sign-up form, and you can unsubscribe at any time: every email includes a link to do
          so. We use Brevo to send these emails; see{" "}
          <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" className={link}>
            Brevo&apos;s privacy policy
          </a>{" "}
          for how they handle this data on our behalf.
        </p>
        <p>
          <strong className="text-white">When you browse our website.</strong> Our hosting provider (Vercel) automatically logs
          standard technical information, like your IP address and browser type, for security and to keep the site running. We
          also use cookies for analytics and advertising, but only once you&apos;ve given consent; see the{" "}
          <Link href="/cookies" className={link}>Cookie Policy</Link> for the full detail.
        </p>

        <H3>Who we share data with</H3>
        <p className="mb-3">We don&apos;t sell your data. We share it only with the services that help us run the business:</p>
        <List
          items={[
            "Meta: WhatsApp, Facebook and Instagram if you interact with those pages, and the Meta Pixel for ad measurement, only with your consent",
            "Brevo: email sign-up and offer emails",
            "Google: website analytics, only with your consent",
            "Vercel: website hosting",
          ]}
        />
        <p className="mt-3">
          Some of these providers may process data outside the UK. Where that happens, they do so under their own legal
          safeguards, such as standard contractual clauses, which you can check in their own privacy policies.
        </p>

        <H3>How long we keep it</H3>
        <List
          items={[
            "WhatsApp conversations and booking details: kept for as long as needed to carry out the work and for our basic business and tax records, then deleted.",
            <>
              Email sign-up details: kept until you unsubscribe, or until <ToConfirm>period of inactivity, e.g. 24 months</ToConfirm>{" "}
              if you never engage with our emails.
            </>,
            <>
              Analytics data: governed by Google&apos;s retention settings for Google Analytics 4, which we&apos;ve set to{" "}
              <ToConfirm>your GA4 retention setting, commonly 14 months</ToConfirm>.
            </>,
          ]}
        />

        <H3>Your rights</H3>
        <p className="mb-3">Under UK GDPR, you have the right to:</p>
        <List
          items={[
            "ask what data we hold about you",
            "ask us to correct it if it's wrong",
            "ask us to delete it",
            "object to how we're using it, or ask us to restrict it",
            "ask for a copy of it in a portable format",
            "withdraw consent at any time, where we're relying on consent",
          ]}
        />
        <p className="mt-3 mb-3">To use any of these, contact us using the details above. We&apos;ll respond within one month.</p>
        <p>
          If you&apos;re unhappy with how we&apos;ve handled your data, tell us first on WhatsApp or by email, and we&apos;ll do
          our best to put it right. If you&apos;re still not satisfied, you have the right to complain to the Information
          Commissioner&apos;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className={link}>ico.org.uk</a>.
        </p>

        <H3>Changes to this policy</H3>
        <p>We may update this policy as the business or the law changes. The date at the top shows when it was last updated.</p>
      </Container>
    </Section>
  );
}
