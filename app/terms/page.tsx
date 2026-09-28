import type { ReactNode } from "react";
import { Metadata } from "next";
import { site } from "../../data/site";
import { warranty } from "../../data/warranty";
import { Container, Section } from "../../components/layout/layout-primitives";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  robots: {
    index: false,
    follow: true,
  },
};

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wide mt-8 mb-3">{children}</h3>;
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 marker:text-accent-light">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function TermsPage() {
  const { company } = site;
  const email = site.social.email;

  return (
    <Section>
      <Container className="max-w-3xl text-muted leading-relaxed">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white uppercase tracking-tight mb-6">Terms &amp; Conditions</h1>
        <p>
          These terms are provided by {company.legalName}, registered in {company.registeredIn} (company no. {company.number}).
          Registered office: {company.registeredOffice}. Contact:{" "}
          <a href={`mailto:${email}`} className="text-accent-light hover:text-white underline underline-offset-4">{email}</a>.
        </p>

        <section id="warranty" className="scroll-mt-24 mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase mb-4">{warranty.name}</h2>
          <p>
            All ECU and TCU (gearbox) remaps carried out by Revved Performance are covered by our {warranty.name} for as long as
            the original customer owns the vehicle.
          </p>

          <H3>What&apos;s covered</H3>
          <p className="mb-3">
            This warranty covers the ECU/TCU calibration software supplied and installed by Revved Performance. If a fault, error
            or issue is caused directly by our calibration, we will diagnose it and correct, amend or reinstall the calibration
            free of charge.
          </p>
          <p>
            The warranty applies only to the original vehicle and the ECU/TCU on which the calibration was installed.
          </p>

          <H3>Remap add-ons</H3>
          <p className="mb-3">
            Optional ECU calibration features, including Pops &amp; Bangs/Burble, Speed Limiter Removal and Launch Control, are
            covered by the {warranty.name} where the issue is directly attributable to the software calibration supplied by
            Revved Performance.
          </p>
          <p>
            The warranty does not cover mechanical or component damage, excessive wear, overheating, misfire, exhaust or
            emissions-system damage, clutch or gearbox damage, or any other vehicle fault arising from the use of these features.
          </p>

          <H3>What&apos;s not covered</H3>
          <p className="mb-3">This warranty applies to the software calibration only. It does not cover:</p>
          <List
            items={[
              "Mechanical, electrical or electronic component failures, including but not limited to engines, turbochargers, clutches, gearboxes, injectors, DPF systems, sensors, wiring, actuators or other vehicle hardware",
              "Faults that were present before the vehicle was tuned",
              "Normal wear and tear, misuse, neglect or accidents",
              "Third-party modifications, or software alterations carried out by another party",
              "Emissions add-ons (off-road use)",
            ]}
          />

          <H3>Software updates &amp; overwrites</H3>
          <p className="mb-3">
            The {warranty.name} will no longer apply to the existing calibration if the vehicle&apos;s ECU/TCU software is
            subsequently altered, overwritten, updated, cloned, replaced or modified by another party. This includes, but is not
            limited to:
          </p>
          <List
            items={[
              "Manufacturer or main dealer software updates",
              "Software updates carried out during servicing or recall work",
              "Software changes made by another tuning company or third party",
              "ECU/TCU replacement or cloning",
              "Any other modification that alters or replaces the Revved calibration",
            ]}
          />
          <p className="mt-3">
            If a Revved calibration has been overwritten or altered, reinstallation may be available at an additional cost,
            subject to compatibility and availability of the original calibration.
          </p>
          <p className="mt-3">
            Customers are responsible for informing any garage, dealer or third party that the vehicle has been remapped before
            software updates or programming work are carried out.
          </p>

          <H3>Making a claim</H3>
          <p>
            Email{" "}
            <a href={`mailto:${email}`} className="text-accent-light hover:text-white underline underline-offset-4">{email}</a>{" "}
            with your vehicle registration and a description of the issue. Before carrying out warranty work, we will inspect the
            vehicle and the ECU/TCU software to confirm the issue is caused by our calibration.
          </p>

          <H3>Your legal rights</H3>
          <p>
            This warranty is given by {company.legalName}, {company.registeredOffice}. It is in addition to, and does not
            affect, your statutory rights under the Consumer Rights Act 2015.
          </p>
        </section>
      </Container>
    </Section>
  );
}
