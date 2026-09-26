"use client";

import * as React from "react";
import { trackEvent } from "../../lib/analytics";
import { buildWhatsAppUrl, getWhatsAppMessage } from "../../lib/whatsapp";
import { Button } from "../ui/Button";

export function VehicleLookup() {
  const [reg, setReg] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (reg === "") trackEvent("vehicle_lookup_start");
    setReg(e.target.value.toUpperCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reg) return;
    trackEvent("quote_start");
    trackEvent("whatsapp_click");
    
    const message = getWhatsAppMessage({ reg });
    window.location.href = buildWhatsAppUrl(message);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 relative">
        <div className="relative flex-1 mb-4 sm:mb-0 group">
           {/* GB Badge */}
           <div className="absolute left-0 top-0 bottom-0 w-10 md:w-12 bg-blue-700 flex flex-col items-center justify-center rounded-l-md border border-r-0 border-blue-800 z-10 pointer-events-none">
             <div className="w-5 h-5 border-[2px] border-yellow-400 rounded-full flex flex-wrap justify-center content-center mb-1">
               <div className="w-1 h-1 bg-yellow-400 rounded-full m-[1px]"></div>
               <div className="w-1 h-1 bg-yellow-400 rounded-full m-[1px]"></div>
               <div className="w-1 h-1 bg-yellow-400 rounded-full m-[1px]"></div>
             </div>
             <span className="text-white text-[10px] font-bold">GB</span>
           </div>
           
          <input
            type="text"
            value={reg}
            onChange={handleChange}
            placeholder="e.g. AB12 CDE"
            className="w-full h-14 md:h-16 pl-14 bg-white text-black font-bold text-lg md:text-2xl rounded-md border-2 border-transparent focus:border-accent uppercase tracking-widest placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-accent/30 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
          />
        </div>
        <Button variant="primary" className="h-14 md:h-16 px-8 text-sm md:text-base uppercase tracking-widest font-bold whitespace-nowrap">
          Check My Car &rarr;
        </Button>
      </div>
    </form>
  );
}
