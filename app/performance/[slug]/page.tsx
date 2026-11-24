import { Metadata } from "next";
import { notFound } from "next/navigation";
import { remapJobs } from "../../../data/performance";
import { remapFaqs } from "../../../data/warranty";
import { ServicePage } from "../../../components/sections/ServicePage";

export function generateStaticParams() {
  return remapJobs.map((job) => ({ slug: job.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = remapJobs.find((j) => j.id === slug);
  if (!job) return {};
  return {
    title: job.seoTitle ?? `${job.name}, East London & Essex`,
    description: job.seoDescription ?? job.description,
    alternates: { canonical: `/performance/${job.id}` },
    // Emissions and software pages stay out of search (brief: ads and search don't point to them)
    robots: job.indexable ? undefined : { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = remapJobs.find((j) => j.id === slug);
  if (!job) notFound();
  return (
    <ServicePage
      job={job}
      tone="dark"
      parent={{ label: "Performance", href: "/performance" }}
      priceNote={job.price.startsWith("From") ? "The exact price depends on your car." : undefined}
      faqs={remapFaqs}
      siblings={remapJobs.filter((j) => j.id !== job.id).map((j) => ({ ...j, href: `/performance/${j.id}` }))}
      path={`/performance/${job.id}`}
    />
  );
}
