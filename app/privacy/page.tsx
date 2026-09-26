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
    </main>
  );
}
