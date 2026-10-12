// Campaign attribution from the landing URL. The URL is only read into memory
// on load; nothing is written to sessionStorage until the user consents.

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;
const STORAGE_KEY = "revved-attribution";

export type Attribution = Partial<Record<(typeof KEYS)[number], string>>;

// Captured at module load, i.e. on the landing page, so it survives client-side
// navigation that happens before the user makes a consent choice.
const landing: Attribution = typeof window === "undefined" ? {} : fromSearch(window.location.search);

function fromSearch(search: string): Attribution {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  KEYS.forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) found[key] = value.slice(0, 100);
  });
  return found;
}

// Call only after consent. A landing URL with no tags keeps what this session already has.
export function persistAttribution() {
  if (Object.keys(landing).length === 0) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(landing));
  } catch {
    // Storage blocked: attribution is skipped
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

export function clearAttribution() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // nothing to clear
  }
}
