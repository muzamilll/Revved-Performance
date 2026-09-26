"use client";

import * as React from "react";
import { Container, Section, SectionHeading } from "../layout/layout-primitives";
import { Button } from "../ui/Button";
import { Card, Badge, PriceTag } from "../ui/ui-primitives";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ImagePlaceholder } from "../ui/Img";
import { Reveal } from "../ui/Reveal";
import { Accordion } from "../ui/Accordion";
import { Modal } from "../ui/Modal";

export default function Showcase() {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="pb-20">
      {/* Hero / Reveal */}
      <Section className="border-b border-thin overflow-hidden relative">
        {/* Subtle dyno-curve SVG line graphic */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 1000 300" className="w-full min-w-[1000px] h-auto stroke-accent fill-none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,250 C200,250 300,220 400,180 C500,140 600,100 750,80 C850,66 950,50 1000,20" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <Container className="relative z-10">
          <Reveal priority>
            <div className="max-w-3xl">
              <Badge className="mb-4">Design System Showcase</Badge>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
                Premium automotive feel.
              </h1>
              <p className="text-xl text-muted mb-8">
                This is a temporary page rendering all core components and variants to review typography, spacing, depth, and motion.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Action</Button>
                <Button variant="secondary">Secondary Action</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Cards & Badges */}
      <Section className="border-b border-thin">
        <Container>
          <Reveal>
            <SectionHeading 
              eyebrow="Components" 
              title="Cards and Data Display" 
              intro="We use layered dark surfaces and thin borders to create depth without heavy drop shadows."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <Badge>Stage 1 Remap</Badge>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Performance Tune</h3>
                <p className="text-muted mb-6 flex-1">
                  Want more power and sharper response? A full calibration with dyno testing.
                </p>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-thin/50">
                  <PriceTag price={{ amount: 250, from: true }} />
                </div>
              </Card>
              
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <Badge>Diagnostics</Badge>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Health Check</h3>
                <p className="text-muted mb-6 flex-1">
                  Full vehicle health check and fault code reading.
                </p>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-thin/50">
                  <PriceTag price={{ amount: 75, from: false }} />
                </div>
              </Card>

              <Card>
                <div className="flex justify-between items-start mb-4">
                  <Badge>Add-on</Badge>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">Speed Limiter Removal</h3>
                <p className="text-muted mb-6 flex-1">
                  Available as an add-on alongside any remap.
                </p>
                <div className="flex items-end justify-between mt-auto pt-6 border-t border-thin/50">
                  <PriceTag price={null} />
                </div>
              </Card>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Interactive elements */}
      <Section className="border-b border-thin">
        <Container>
          <Reveal>
            <SectionHeading 
              eyebrow="Interactive" 
              title="Modals and Accordions" 
              intro="Smooth animations for interactive elements, respecting reduced motion preferences."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-6">Accordion</h3>
                <div className="border-t border-thin">
                  <Accordion title="Do I need a Stage 1 or Stage 2?">
                    <p className="pt-2">A Stage 1 remap requires no hardware modifications and is completely safe for a stock vehicle. Stage 2 requires an upgraded intercooler and exhaust.</p>
                  </Accordion>
                  <Accordion title="Is this bad for my engine?">
                    <p className="pt-2">When driven normally, fuel economy often improves and engine wear is unchanged. We never push beyond safe tolerances.</p>
                  </Accordion>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-6">Modal Dialog</h3>
                <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
                
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                  <h3 className="text-2xl font-heading font-bold text-white mb-4">Vehicle Verification</h3>
                  <p className="text-muted mb-6">
                    Before we map any vehicle, we conduct a full diagnostic and mechanical health check. If your car isn&apos;t healthy enough for a remap, we won&apos;t tune it.
                  </p>
                  <div className="flex justify-end gap-4 mt-8">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setModalOpen(false)}>Understood</Button>
                  </div>
                </Modal>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Imagery & Integrations */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading 
              eyebrow="Media" 
              title="Images and Integrations" 
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <ImagePlaceholder aspectRatio="16/9" label="16:9 LCP Hero Image" />
              <ImagePlaceholder aspectRatio="4/3" label="4:3 Content Image" />
            </div>

            <div className="bg-surface p-8 rounded-xl border border-thin">
              <h3 className="text-xl font-heading font-bold text-white mb-4">WhatsApp Integration</h3>
              <p className="text-muted mb-6">
                The primary conversion action across the site. Triggers analytics and formats pre-filled messages.
              </p>
              <WhatsAppButton message="Hi Revved, I'm testing the site!" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  );
}
