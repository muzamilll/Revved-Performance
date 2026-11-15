import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareCategory } from "../../data/care";
import { CategoryPage } from "../../components/sections/CategoryPage";

const category = getCareCategory("brakes");

export const metadata: Metadata = category
  ? {
      title: category.seoTitle,
      description: category.seoDescription,
      alternates: { canonical: "/brakes" },
    }
  : {};

export default function Page() {
  if (!category) notFound();
  return <CategoryPage category={category} />;
}
