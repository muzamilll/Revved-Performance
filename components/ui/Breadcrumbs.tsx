import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-sm text-muted overflow-x-auto whitespace-nowrap pb-2">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          {index === items.length - 1 ? (
            <span className="text-muted font-medium" aria-current="page">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-white transition-colors">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
