"use client";

import * as React from "react";
import { Problem, Service } from "../../types";
import { Card, PriceTag } from "../ui/ui-primitives";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { Button } from "../ui/Button";

interface ProblemSelectorProps {
  problems: Problem[];
  services: Service[];
}

export function ProblemSelector({ problems, services }: ProblemSelectorProps) {
  const [selectedProblem, setSelectedProblem] = React.useState<Problem | null>(null);

  const recommendedService = selectedProblem?.recommendedServiceSlug 
    ? services.find(s => s.slug === selectedProblem.recommendedServiceSlug) 
    : null;

  return (
    <div className="flex flex-col gap-8">
      {!selectedProblem ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProblem(p);
                // We're omitting specific tracking event for problem selection to keep it simple, or using a generic one
              }}
              className="p-6 text-left border border-thin bg-surface hover:bg-surface/80 rounded-xl transition-colors text-white font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button 
            variant="ghost" 
            className="mb-4 text-muted hover:text-white"
            onClick={() => setSelectedProblem(null)}
          >
            ← Back to options
          </Button>
          
          {recommendedService ? (
            <Card className="border-accent/50 glow-plum relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 {/* Decorative element */}
                 <div className="w-24 h-24 rounded-full bg-accent blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-heading font-bold text-white mb-2">Recommended: {recommendedService.name}</h3>
                <p className="text-muted mb-6">
                  {recommendedService.shortDescription || "We can diagnose and resolve this issue."}
                </p>
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-thin">
                  <PriceTag price={recommendedService.price} />
                </div>
                <div className="flex flex-col gap-4">
                  <WhatsAppButton 
                    message={selectedProblem.whatsappMessage || `Hi Revved, I'm experiencing an issue: ${selectedProblem.label}`} 
                  />
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <h3 className="text-xl font-heading font-bold text-white mb-2">Let&apos;s discuss it</h3>
              <p className="text-muted mb-6">
                Send us a message and we&apos;ll help you figure out the best course of action.
              </p>
              <WhatsAppButton 
                message={selectedProblem.whatsappMessage || `Hi Revved, I need some advice about my car: ${selectedProblem.label}`} 
              />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
