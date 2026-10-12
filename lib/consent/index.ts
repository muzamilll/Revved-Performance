import { useSyncExternalStore } from "react";

// Provider-agnostic consent store. Nothing here knows about GA4 or Meta:
// providers read the categories and decide for themselves what to load.

export type ConsentCategory = "analytics" | "marketing";

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  // "unknown" on the server and during hydration, "undecided" until the user picks
  status: "unknown" | "undecided" | "decided";
}

const STORAGE_KEY = "revved-consent";
const STORAGE_VERSION = 1;

const SERVER_STATE: ConsentState = { analytics: false, marketing: false, status: "unknown" };
const DEFAULT_STATE: ConsentState = { analytics: false, marketing: false, status: "undecided" };

let state: ConsentState | null = null;
const listeners = new Set<() => void>();

function readStored(): ConsentState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (parsed?.v !== STORAGE_VERSION) return DEFAULT_STATE;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      status: "decided",
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return SERVER_STATE;
  if (!state) state = readStored();
  return state;
}

export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category];
}

// Only called from an explicit user choice, so nothing is persisted until they pick.
export function setConsent(choice: { analytics: boolean; marketing: boolean }) {
  state = { analytics: choice.analytics, marketing: choice.marketing, status: "decided" };
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: STORAGE_VERSION, analytics: choice.analytics, marketing: choice.marketing, ts: Date.now() })
    );
  } catch {
    // Storage blocked: the choice still applies for this page view
  }
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribeConsent, getConsent, () => SERVER_STATE);
}
