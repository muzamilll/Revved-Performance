"use client";

import { useEffect, useState } from "react";

export function Countdown({ endDateStr }: { endDateStr: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  useEffect(() => {
    const targetDate = new Date(endDateStr).getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [endDateStr]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-4 mt-6">
      <div className="flex flex-col items-center p-3 bg-surface border border-accent/30 rounded-lg min-w-[70px]">
        <span className="text-2xl font-bold text-accent-light">{timeLeft.days}</span>
        <span className="text-xs uppercase tracking-wider text-muted">Days</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-surface border border-accent/30 rounded-lg min-w-[70px]">
        <span className="text-2xl font-bold text-accent-light">{timeLeft.hours}</span>
        <span className="text-xs uppercase tracking-wider text-muted">Hours</span>
      </div>
      <div className="flex flex-col items-center p-3 bg-surface border border-accent/30 rounded-lg min-w-[70px]">
        <span className="text-2xl font-bold text-accent-light">{timeLeft.minutes}</span>
        <span className="text-xs uppercase tracking-wider text-muted">Mins</span>
      </div>
    </div>
  );
}
