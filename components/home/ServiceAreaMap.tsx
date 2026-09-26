"use client";

import * as React from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import mapImage from "../../public/images/service-area-map.jpg";

const ALT =
  "Map of our mobile service area centred on Romford, covering East London and Essex including Harlow, Cheshunt, Enfield, Epping, Loughton, Chigwell, Walthamstow, Wanstead, Stratford, Ilford, Barking, Dagenham, Hornchurch, Upminster, Brentwood, Billericay, Basildon and Chelmsford.";

// Romford's position in the source image (px), used to centre the full-size view.
const ROMFORD = { x: 815, y: 540 };

export function ServiceAreaMap() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      dialog.showModal();
      const scroller = scrollRef.current;
      if (scroller) {
        scroller.scrollLeft = ROMFORD.x - scroller.clientWidth / 2;
        scroller.scrollTop = ROMFORD.y - scroller.clientHeight / 2;
      }
    } else if (dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-thin bg-surface/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        aria-label="View full-size service area map"
      >
        <Image
          src={mapImage}
          alt={ALT}
          placeholder="blur"
          sizes="(min-width: 1440px) 1344px, (min-width: 768px) calc(100vw - 64px), calc(100vw - 48px)"
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute bottom-3 right-3 md:bottom-5 md:right-5 flex items-center gap-2 rounded-full border border-thin bg-background/80 px-3 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
          <Expand className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="md:hidden">Tap to enlarge</span>
          <span className="hidden md:inline">View full map</span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        aria-label="Service area map"
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-background p-0 backdrop:bg-background"
      >
        <div ref={scrollRef} className="h-full w-full overflow-auto overscroll-contain">
          <Image
            src={mapImage}
            alt={ALT}
            sizes="1536px"
            className="block h-auto w-[1536px] max-w-none min-[1536px]:w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed top-4 right-4 flex items-center gap-2 rounded-full border border-thin bg-background/90 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Close map"
        >
          <X className="w-4 h-4" aria-hidden="true" />
          Close
        </button>
      </dialog>
    </>
  );
}
