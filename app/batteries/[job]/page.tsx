import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareCategory } from "../../../data/care";
import { ServicePage } from "../../../components/sections/ServicePage";

const category = getCareCategory("batteries")!;

export function generateStaticParams() {
  return category.jobs.map((job) => ({ job: job.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ job: string }> }): Promise<Metadata> {
  const { job: id } = await params;
  const job = category.jobs.find((j) => j.id === id);
  if (!job) return {};
  return {
    title: `${job.name}, East London & Essex`,
    description: `${job.name} at your home or work across East London & Essex, ${job.price.toLowerCase()}. ${job.description}`.slice(0, 160),
    alternates: { canonical: `/batteries/${job.id}` },
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
      parent={{ label: category.name, href: "/batteries" }}
      priceNote={job.basis.startsWith(job.price) ? job.basis.slice(job.price.length).replace(/^\.\s*/, "") || undefined : job.basis}
      faqs={category.faqs}
      siblings={category.jobs.filter((j) => j.id !== job.id).map((j) => ({ ...j, href: `/batteries/${j.id}` }))}
      path={`/batteries/${job.id}`}
    />
  );
}
