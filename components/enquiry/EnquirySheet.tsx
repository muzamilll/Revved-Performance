"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, Pencil, Plus, X } from "lucide-react";
import {
  EnquiryChoice,
  EnquiryValues,
  TIMING_OPTIONS,
  buildEnquiryMessage,
  describeTiming,
  formatPostcode,
  formatReg,
  isPlausiblePostcode,
} from "../../lib/enquiry";
import { isPlausibleReg } from "../../lib/vehicle";
import { buildWhatsAppUrl, getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { lockScroll } from "../../lib/scroll-lock";
import { site } from "../../data/site";
import { buttonStyles } from "../ui/Button";
import { WhatsAppLink } from "../ui/actions";
import { cn } from "../../lib/utils";

type Errors = Partial<Record<"jobs" | "reg" | "postcode" | "timing" | "date", string>>;

interface EnquirySheetProps {
  choices: EnquiryChoice[];
  visible: boolean;
  step: 1 | 2;
  setStep: (step: 1 | 2) => void;
  values: EnquiryValues;
  setValues: React.Dispatch<React.SetStateAction<EnquiryValues>>;
  onClose: () => void;
}

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validate(values: EnquiryValues, choices: EnquiryChoice[]): Errors {
  const errors: Errors = {};
  if (!values.choiceIds.some((cid) => choices.some((c) => c.id === cid))) errors.jobs = "Add at least one job.";
  if (!values.reg.trim()) errors.reg = "Enter your registration.";
  else if (!isPlausibleReg(values.reg)) errors.reg = "That doesn't look like a registration. Use letters and numbers only.";
  if (!values.postcode.trim()) errors.postcode = "Enter the postcode where the car will be.";
  else if (!isPlausiblePostcode(values.postcode)) errors.postcode = "Enter a UK postcode, such as RM1 3AB.";
  if (!values.timing) errors.timing = "Choose when you'd like us, or pick Just a price.";
  else if (values.timing === "date") {
    if (!values.date) errors.date = "Choose a date.";
    else if (values.date < todayIso()) errors.date = "Choose today or a later date.";
  }
  return errors;
}

const labelClass = "block text-[13px] font-bold uppercase tracking-[0.12em] text-ink";
const inputClass =
  "w-full min-h-[52px] rounded-md border-[1.5px] border-ink/35 bg-white px-4 text-[17px] text-ink placeholder:text-ink-soft/70 focus:border-ink";
const errorClass = "mt-2 text-sm font-medium text-[#A4161A]";

export function EnquirySheet({ choices, visible, step, setStep, values, setValues, onClose }: EnquirySheetProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = React.useState<Errors>({});
  const [sent, setSent] = React.useState(false);
  const id = React.useId();

  // The jobs in this booking, in the order they were added
  const selected = values.choiceIds.flatMap((cid) => choices.filter((c) => c.id === cid));
  const addJob = (cid: string) => {
    if (!cid) return;
    setValues((v) => (v.choiceIds.includes(cid) ? v : { ...v, choiceIds: [...v.choiceIds, cid] }));
    setErrors((e) => ({ ...e, jobs: undefined }));
  };
  const removeJob = (cid: string) => setValues((v) => ({ ...v, choiceIds: v.choiceIds.filter((x) => x !== cid) }));
  const groups = React.useMemo(() => {
    const map = new Map<string, EnquiryChoice[]>();
    choices.forEach((c) => map.set(c.group, [...(map.get(c.group) ?? []), c]));
    return Array.from(map.entries());
  }, [choices]);

  const set = <K extends keyof EnquiryValues>(key: K, value: EnquiryValues[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  // Lock the page behind the sheet; Escape closes it
  React.useEffect(() => {
    const unlock = lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Keep the sheet above the on-screen keyboard. Phones shrink the visual viewport when the
  // keyboard opens, so the sheet's bottom edge and height follow it and the fields stay reachable.
  React.useEffect(() => {
    const vv = window.visualViewport;
    const panel = panelRef.current;
    if (!vv || !panel) return;
    const sync = () => {
      const keyboard = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      panel.style.setProperty("--kb", `${keyboard}px`);
      panel.style.setProperty("--vvh", `${vv.height}px`);
    };
    sync();
    vv.addEventListener("resize", sync);
    vv.addEventListener("scroll", sync);
    return () => {
      vv.removeEventListener("resize", sync);
      vv.removeEventListener("scroll", sync);
    };
  }, []);

  // Move focus to the step heading when the sheet opens and when the step changes.
  // (Not to the first field: that would throw the keyboard up before the form has been seen.)
  React.useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    scrollRef.current?.scrollTo({ top: 0 });
  }, [step]);

  // Keep Tab inside the sheet
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
      )
    ).filter((el) => el.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === headingRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const goToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values, choices);
    setErrors(found);
    const firstError = (["jobs", "reg", "postcode", "timing", "date"] as const).find((k) => found[k]);
    if (firstError) {
      const target = firstError === "timing" ? `${id}-timing-asap` : `${id}-${firstError}`;
      document.getElementById(target)?.focus();
      return;
    }
    // Tidy what was typed before showing it back
    setValues((v) => ({ ...v, reg: formatReg(v.reg), postcode: formatPostcode(v.postcode) }));
    setSent(false);
    setStep(2);
  };

  const whatsappUrl = buildWhatsAppUrl(buildEnquiryMessage(values, selected));

  return (
    <div className="fixed inset-0 z-[60]" onKeyDown={onKeyDown}>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink/65 transition-opacity duration-200 motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Sheet: slides up from the bottom on phones, in from the right on larger screens */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
        className={cn(
          "absolute inset-x-0 bottom-[var(--kb,0px)] flex max-h-[calc(var(--vvh,100dvh)-0.75rem)] flex-col rounded-t-2xl bg-cream text-ink shadow-[0_-12px_48px_rgba(11,6,9,0.45)]",
          "md:inset-y-0 md:left-auto md:right-0 md:bottom-0 md:h-full md:max-h-none md:w-[480px] md:rounded-none md:shadow-[-12px_0_48px_rgba(11,6,9,0.45)]",
          "transition-transform duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          visible ? "translate-y-0 md:translate-x-0" : "translate-y-full md:translate-y-0 md:translate-x-full"
        )}
      >
        {/* Header: Back (step 2), step title, Close */}
        <div className="flex shrink-0 items-center gap-1 border-b border-line px-2 py-2">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-md px-3 text-[15px] font-semibold text-ink hover:bg-ink/5"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Back
            </button>
          ) : (
            <span className="w-3" aria-hidden="true" />
          )}
          <div className="min-w-0 flex-1 px-1">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-plum">Step {step} of 2</p>
            <h2 id={`${id}-title`} ref={headingRef} tabIndex={-1} className="truncate text-[19px] font-semibold tracking-[-0.01em] outline-none">
              {step === 1 ? "Get a quote" : "Check and send"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-md px-3 text-[15px] font-semibold text-ink hover:bg-ink/5"
          >
            Close
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-5">
          {step === 1 ? (
            <form onSubmit={goToReview} noValidate className="flex flex-col gap-6">
              <p className="text-[15px] leading-relaxed text-ink-soft">
                Add every job you need. Just a question instead?{" "}
                <WhatsAppLink plain icon={false} className="font-semibold text-plum underline underline-offset-2">Ask on WhatsApp</WhatsAppLink>.
              </p>

              {/* Jobs: as many as the customer wants */}
              <fieldset aria-describedby={errors.jobs ? `${id}-jobs-error` : undefined}>
                <legend className={labelClass}>{selected.length > 1 ? `Jobs (${selected.length})` : "Job"}</legend>
                {selected.length > 0 && (
                  <ul className="mt-2 divide-y divide-line overflow-hidden rounded-md border-[1.5px] border-ink/20 bg-white">
                    {selected.map((c) => (
                      <li key={c.id} className="flex items-center gap-3 py-1.5 pl-4 pr-1.5">
                        <span className="min-w-0 flex-1">
                          <span className="block text-[16px] font-semibold leading-snug">{c.label}</span>
                          {c.price && <span className="block text-[14px] text-ink-soft">{c.price}</span>}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeJob(c.id)}
                          aria-label={`Remove ${c.label}`}
                          className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-md text-ink-soft hover:bg-ink/5 hover:text-ink"
                        >
                          <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="relative mt-2">
                  <label htmlFor={`${id}-jobs`} className="sr-only">{selected.length ? "Add another job" : "Choose a job"}</label>
                  <select
                    id={`${id}-jobs`}
                    value=""
                    onChange={(e) => addJob(e.target.value)}
                    aria-invalid={!!errors.jobs}
                    className={cn(
                      inputClass,
                      "cursor-pointer appearance-none pl-11 pr-11 font-semibold",
                      selected.length ? "border-dashed text-plum" : "",
                      errors.jobs && "border-[#A4161A]"
                    )}
                  >
                    <option value="" disabled>{selected.length ? "Add another job" : "Choose a job"}</option>
                    {groups.map(([group, items]) => {
                      const available = items.filter((c) => !values.choiceIds.includes(c.id));
                      if (available.length === 0) return null;
                      return (
                        <optgroup key={group} label={group}>
                          {available.map((c) => (
                            <option key={c.id} value={c.id}>{c.price ? `${c.label} · ${c.price}` : c.label}</option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>
                  <Plus aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-plum" />
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                </div>
                {errors.jobs && <p id={`${id}-jobs-error`} className={errorClass}>{errors.jobs}</p>}
              </fieldset>

              {/* Registration, as a number plate */}
              <div>
                <label htmlFor={`${id}-reg`} className={labelClass}>Registration</label>
                <input
                  id={`${id}-reg`}
                  type="text"
                  inputMode="text"
                  autoCapitalize="characters"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={9}
                  placeholder="AB12 CDE"
                  value={values.reg}
                  onChange={(e) => set("reg", e.target.value.toUpperCase())}
                  aria-invalid={!!errors.reg}
                  aria-describedby={errors.reg ? `${id}-reg-error` : undefined}
                  className={cn(
                    "mt-2 w-full min-h-[60px] rounded-md border-[2.5px] border-ink bg-plate px-4 text-center text-[28px] font-bold uppercase tracking-[0.08em] text-ink placeholder:text-ink/25",
                    errors.reg && "border-[#A4161A]"
                  )}
                />
                {errors.reg && <p id={`${id}-reg-error`} className={errorClass}>{errors.reg}</p>}
              </div>

              {/* Postcode */}
              <div>
                <label htmlFor={`${id}-postcode`} className={labelClass}>Postcode</label>
                <input
                  id={`${id}-postcode`}
                  type="text"
                  autoCapitalize="characters"
                  autoComplete="postal-code"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={9}
                  placeholder="RM1 3AB"
                  value={values.postcode}
                  onChange={(e) => set("postcode", e.target.value.toUpperCase())}
                  aria-invalid={!!errors.postcode}
                  aria-describedby={`${id}-postcode-hint${errors.postcode ? ` ${id}-postcode-error` : ""}`}
                  className={cn(inputClass, "mt-2 font-semibold uppercase tracking-[0.04em]", errors.postcode && "border-[#A4161A]")}
                />
                <p id={`${id}-postcode-hint`} className="mt-2 text-sm text-ink-soft">Where the car will be: home, work or the seller&apos;s.</p>
                {errors.postcode && <p id={`${id}-postcode-error`} className={errorClass}>{errors.postcode}</p>}
              </div>

              {/* Preferred timing */}
              <fieldset aria-describedby={errors.timing ? `${id}-timing-error` : undefined}>
                <legend className={labelClass}>Preferred timing</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIMING_OPTIONS.map((option) => {
                    const selected = values.timing === option.id;
                    return (
                      <label
                        key={option.id}
                        className={cn(
                          "relative inline-flex min-h-[48px] cursor-pointer items-center rounded-md border-[1.5px] px-4 text-[15px] font-semibold transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                          selected ? "border-ink bg-plate text-ink" : "border-ink/35 bg-white text-ink hover:border-ink"
                        )}
                      >
                        <input
                          id={`${id}-timing-${option.id}`}
                          type="radio"
                          name={`${id}-timing`}
                          value={option.id}
                          checked={selected}
                          onChange={() => set("timing", option.id)}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
                {errors.timing && <p id={`${id}-timing-error`} className={errorClass}>{errors.timing}</p>}

                {values.timing === "date" && (
                  <div className="mt-4">
                    <label htmlFor={`${id}-date`} className={labelClass}>Date</label>
                    <input
                      id={`${id}-date`}
                      type="date"
                      min={todayIso()}
                      value={values.date}
                      onChange={(e) => set("date", e.target.value)}
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? `${id}-date-error` : undefined}
                      className={cn(inputClass, "mt-2", errors.date && "border-[#A4161A]")}
                    />
                    {errors.date && <p id={`${id}-date-error`} className={errorClass}>{errors.date}</p>}
                  </div>
                )}
                <p className="mt-3 text-sm text-ink-soft">We&apos;ll reply with a time that suits you.</p>
              </fieldset>

              {/* Notes */}
              <div>
                <label htmlFor={`${id}-notes`} className={labelClass}>
                  Notes <span className="font-medium normal-case tracking-normal text-ink-soft">(optional)</span>
                </label>
                <textarea
                  id={`${id}-notes`}
                  rows={3}
                  maxLength={500}
                  value={values.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  aria-describedby={`${id}-notes-hint`}
                  className={cn(inputClass, "mt-2 py-3 leading-relaxed")}
                />
                <p id={`${id}-notes-hint`} className="mt-2 text-sm text-ink-soft">Symptoms, where the car is parked, a preferred time.</p>
              </div>

              <button type="submit" className={buttonStyles("primary", "w-full min-h-[56px] cursor-pointer text-[16px]")}>
                Check my request
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="rounded-lg border border-line bg-white">
                <div className="flex items-center justify-between border-b border-line py-1.5 pl-4 pr-1.5">
                  <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-ink">Your request</p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-md px-3 text-[15px] font-semibold text-plum hover:bg-plum/10"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    Edit
                  </button>
                </div>
                <dl className="divide-y divide-line px-4 text-[15px]">
                  <div className="py-3.5">
                    <dt className="text-ink-soft">{selected.length > 1 ? `Jobs (${selected.length})` : "Job"}</dt>
                    <dd>
                      <ul className="mt-2 flex flex-col gap-3">
                        {selected.map((c) => (
                          <li key={c.id}>
                            <span className="block font-semibold">{c.label}</span>
                            <span className="block text-[14px] leading-relaxed text-ink-soft">{c.basis}</span>
                            {c.note && <span className="mt-1 block text-[13px] leading-relaxed text-ink-soft">{c.note}</span>}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3 py-3.5">
                    <dt className="text-ink-soft">Registration</dt>
                    <dd>
                      <span className="inline-block rounded border-2 border-ink bg-plate px-2.5 py-0.5 text-[17px] font-bold tracking-[0.06em]">{values.reg}</span>
                    </dd>
                  </div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-3.5">
                    <dt className="text-ink-soft">Postcode</dt>
                    <dd className="font-semibold">{values.postcode}</dd>
                  </div>
                  <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-3.5">
                    <dt className="text-ink-soft">Timing</dt>
                    <dd className="font-semibold">{describeTiming(values)}</dd>
                  </div>
                  {values.notes.trim() && (
                    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-3 py-3.5">
                      <dt className="text-ink-soft">Notes</dt>
                      <dd className="whitespace-pre-wrap break-words">{values.notes.trim()}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <p className="text-[15px] leading-relaxed text-ink-soft">
                WhatsApp opens with this written out. Press Send and we&apos;ll reply with the price for your car and a time. You pay on the day, when the job is done.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("whatsapp_click", { jobs: selected.map((c) => c.id).join(",") });
                  setSent(true);
                }}
                className={buttonStyles("primary", "w-full min-h-[56px] text-[16px]")}
              >
                Send on WhatsApp
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <p role="status" className="text-sm leading-relaxed text-ink-soft">
                {sent ? (
                  <>
                    <strong className="font-semibold text-ink">WhatsApp has your request ready. Press Send there.</strong>{" "}
                    Didn&apos;t open? Call{" "}
                  </>
                ) : (
                  <>No WhatsApp? Call </>
                )}
                <a href={getPhoneUrl()} onClick={() => trackEvent("phone_click")} className="font-semibold text-plum underline underline-offset-2">
                  {site.phoneDisplay}
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
