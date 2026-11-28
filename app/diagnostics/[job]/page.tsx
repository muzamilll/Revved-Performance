import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareCategory } from "../../../data/care";
import { ServicePage } from "../../../components/sections/ServicePage";

const category = getCareCategory("diagnostics")!;

export function generateStaticParams() {
  // Only the pre-purchase inspection keeps its own page; other jobs live on /diagnostics
  return [{ job: "pre-purchase-inspection" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ job: string }> }): Promise<Metadata> {
  const { job: id } = await params;
  const job = category.jobs.find((j) => j.id === id);
  if (!job) return {};
  return {
    title: `${job.name}, East London & Essex`,
    description: `${job.name} at your home or work across East London & Essex, ${job.price.toLowerCase()}. ${job.description}`.slice(0, 160),
    alternates: { canonical: `/diagnostics/${job.id}` },
  };
}

export default async function Page({ params }: { params: Promise<{ job: string }> }) {
  const { job: id } = await params;
  const job = category.jobs.find((j) => j.id === id);
  if (!job) notFound();
  return (
    <ServicePage
      job={job}
      tone="plum"
      parent={{ label: category.name, href: "/diagnostics" }}
      priceNote={job.basis.startsWith(job.price) ? job.basis.slice(job.price.length).replace(/^\.\s*/, "") || undefined : job.basis}
      faqs={category.faqs}
      siblings={category.jobs.filter((j) => j.id !== job.id).map((j) => ({ ...j, href: `/diagnostics#${j.id}` }))}
      path={`/diagnostics/${job.id}`}
      trustLine={category.trustLine}
    />
  );
}
