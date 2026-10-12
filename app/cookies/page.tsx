import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "../../components/layout/layout-primitives";

export const metadata: Metadata = {
  title: "Cookie Policy",
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

const code = "text-white font-mono text-sm";

export default function CookiesPage() {
  return (
    <Section>
      <Container className="max-w-3xl text-muted leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">Cookie Policy</h1>
        <p className="mb-3">Last updated: 12 October 2026</p>
        <p>
          We use cookies and similar technologies, such as your browser&apos;s local and session storage, on
          revvedperformance.uk. Here&apos;s what they do and when they&apos;re used. For how we handle personal data more
          generally, see our <Link href="/privacy" className={link}>Privacy Policy</Link>.
        </p>

        <H3>Strictly necessary</H3>
        <p className="mb-3">
          These keep the site working and remember your cookie choice. They don&apos;t need your consent.
        </p>
        <List
          items={[
            <>
              Your cookie choice: which categories you&apos;ve accepted or rejected, stored in your browser&apos;s local storage
              as <span className={code}>revved-consent</span>. It isn&apos;t sent to us or anyone else.
            </>,
          ]}
        />

        <H3>Analytics (Google Analytics 4)</H3>
        <p className="mb-3">
          Helps us understand how people use the site, which pages get visited, and roughly how visitors found us. This only runs
          after you accept it in the cookie banner.
        </p>
        <List
          items={[
            <>
              <span className={code}>_ga</span> and <span className={code}>_ga_&lt;ID&gt;</span>: set by Google to tell visits
              apart and keep track of a session.
            </>,
          ]}
        />

        <H3>Marketing (Meta Pixel)</H3>
        <p className="mb-3">
          Helps us understand whether our Facebook and Instagram ads are actually leading to WhatsApp messages or bookings, and
          improves how those ads are shown. This only runs after you accept it in the cookie banner.
        </p>
        <List
          items={[
            <>
              <span className={code}>_fbp</span> and <span className={code}>_fbc</span>: set by Meta to link visits and ad clicks
              to our site.
            </>,
          ]}
        />

        <H3>Campaign tags</H3>
        <p>
          If you arrive from a link carrying campaign tags (such as <span className={code}>utm_source</span> or{" "}
          <span className={code}>fbclid</span>) and you&apos;ve accepted analytics or marketing, we keep those tags in your
          browser&apos;s session storage until you close the tab. We attach them to enquiry events, such as tapping a WhatsApp
          button, so we can tell which campaign brought you. If you don&apos;t accept, they aren&apos;t stored.
        </p>

        <H3>Managing your choice</H3>
        <p>
          Nothing optional runs unless you accept it in the cookie banner. To change your choice later, clear this site&apos;s
          cookies and site data in your browser settings; the banner will then ask you again. You can also block cookies through
          your browser settings, though blocking all cookies may affect how some sites work.
        </p>

        <H3>Why some cookies still ask for consent</H3>
        <p>
          Recent changes to UK law (the Data (Use and Access) Act 2025) relaxed consent rules for a narrow category of cookies:
          purely first-party statistics that are never shared with anyone else. Our analytics and advertising cookies don&apos;t
          fall into that category, since they involve Google and Meta, so we keep asking for your consent before using them, as
          the law still requires for cookies like these.
        </p>
      </Container>
    </Section>
  );
}
