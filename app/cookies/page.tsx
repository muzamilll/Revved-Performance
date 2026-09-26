import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p>Content is pending.</p>
    </main>
  );
}
