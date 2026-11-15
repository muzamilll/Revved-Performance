"use client";

import * as React from "react";
import {
  EMPTY_ENQUIRY,
  EnquiryChoice,
  EnquiryTiming,
  EnquiryValues,
} from "../../lib/enquiry";
import { trackEvent } from "../../lib/analytics";
import { EnquirySheet } from "./EnquirySheet";

type OpenOptions = { timing?: EnquiryTiming };

type EnquiryContextValue = {
  // Opens the enquiry. Pass a choice id (a service or offer) to preselect it.
  openEnquiry: (choiceId?: string, options?: OpenOptions) => void;
  isOpen: boolean;
};

const EnquiryContext = React.createContext<EnquiryContextValue | null>(null);

export function useEnquiry(): EnquiryContextValue {
  const ctx = React.useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

// How long the sheet takes to slide away; matches the transition in EnquirySheet
const CLOSE_MS = 220;

export function EnquiryProvider({ choices, children }: { choices: EnquiryChoice[]; children: React.ReactNode }) {
  // mounted: the sheet is in the page. visible: it has slid in. Two flags so it can animate both ways.
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [step, setStep] = React.useState<1 | 2>(1);
  // Kept here, not in the sheet, so nothing typed is lost when the sheet is closed and reopened
  const [values, setValues] = React.useState<EnquiryValues>(EMPTY_ENQUIRY);
  const openerRef = React.useRef<HTMLElement | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openEnquiry = React.useCallback(
    (choiceId?: string, options?: OpenOptions) => {
      const choice = choiceId ? choices.find((c) => c.id === choiceId) : undefined;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setValues((v) => ({
        ...v,
        choiceId: choice ? choice.id : v.choiceId,
        timing: options?.timing ?? v.timing,
      }));
      setStep(1);
      setMounted(true);
      // Next frame, so the sheet is painted off-screen first and then slides in
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
      trackEvent("quote_start", choice?.track);
    },
    [choices]
  );

  const closeEnquiry = React.useCallback(() => {
    setVisible(false);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closeTimer.current = setTimeout(() => {
      setMounted(false);
      openerRef.current?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : CLOSE_MS);
  }, []);

  React.useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const ctx = React.useMemo(() => ({ openEnquiry, isOpen: mounted }), [openEnquiry, mounted]);

  return (
    <EnquiryContext.Provider value={ctx}>
      {children}
      {mounted && (
        <EnquirySheet
          choices={choices}
          visible={visible}
          step={step}
          setStep={setStep}
          values={values}
          setValues={setValues}
          onClose={closeEnquiry}
        />
      )}
    </EnquiryContext.Provider>
  );
}
