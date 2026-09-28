import { Metadata } from "next";
import { site } from "../../data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p>Content is pending.</p>
      <p className="mt-4">
        If you give us your email address or phone number through our launch offer sign-up, we use them to send you offers and updates from Revved Performance, only with your consent. You can unsubscribe at any time using the link in any email, or by messaging us on WhatsApp and asking to be removed.
      </p>
      <p className="mt-4">
        This website is run by {site.company.legalName}, registered in {site.company.registeredIn} (company no. {site.company.number}). Registered office: {site.company.registeredOffice}. Contact: <a href={`mailto:${site.social.email}`} className="underline">{site.social.email}</a>.
      </p>
    </main>
  );
}
