import { Metadata } from "next";

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
    </main>
  );
}
