import { Service } from "../../types";
import { SectionHeading } from "../layout/layout-primitives";
import { ServiceCard } from "../home/ServiceCard";

// Shared by the homepage and /services so both always list the same services.
export function ServiceGroups({ services }: { services: Service[] }) {
  const activeServices = services.filter(s => s.status === "active");
  const ecuServices = activeServices.filter(s => s.category === "ecu-remapping");
  const diagServices = activeServices.filter(s => s.category === "diagnostics");

  return (
    <>
      <SectionHeading eyebrow="Performance" title="ECU Remapping & Tuning" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {ecuServices.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>

      <SectionHeading eyebrow="Checks" title="Advanced Diagnostics" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagServices.map(service => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </>
  );
}
