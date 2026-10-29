import type { Metadata } from "next";
import Link from "next/link";
import { isDashboardConfigured, isLoggedIn } from "../../lib/leads/auth";
import { isDatabaseConnected, listLeads } from "../../lib/leads/db";
import {
  LEAD_SOURCES,
  LEAD_STATUSES,
  Lead,
  LeadSource,
  LeadStatus,
  METHOD_LABELS,
  SOURCE_LABELS,
  STATUS_LABELS,
} from "../../lib/leads/types";
import { services } from "../../data/services";
import { ClearTestLeadsButton, LeadActions, LoginForm, SignOutButton } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Lead dashboard",
  robots: { index: false, follow: false },
};

const TZ = "Europe/London";

function alertMinutes(): number {
  const n = Number(process.env.ALERT_MINUTES);
  return Number.isFinite(n) && n > 0 ? n : 30;
}

function londonDay(d: Date): string {
  return d.toLocaleDateString("en-CA", { timeZone: TZ });
}

function londonMonth(d: Date): string {
  return londonDay(d).slice(0, 7);
}

function formatWhen(isoDate: string): string {
  return new Date(isoDate).toLocaleString("en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(ms: number): string {
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `${mins} min`;
  const hours = mins / 60;
  if (hours < 24) return `${hours.toFixed(1)} h`;
  return `${(hours / 24).toFixed(1)} days`;
}

function serviceName(slug: string | null): string | null {
  if (!slug) return null;
  if (slug === "not-sure") return "Not sure yet";
  return services.find((s) => s.slug === slug)?.name ?? slug;
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: "alert" | "accent" }) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        tone === "alert" ? "border-red-400/60 bg-red-500/10" : tone === "accent" ? "border-accent bg-accent/15" : "border-border bg-surface/60"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 text-3xl font-heading font-bold text-white">{value}</p>
    </div>
  );
}

type Search = { status?: string; source?: string; tests?: string };

export default async function DashboardPage({ searchParams }: { searchParams: Promise<Search> }) {
  if (!(await isLoggedIn())) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <LoginForm configured={isDashboardConfigured()} />
      </div>
    );
  }

  const params = await searchParams;
  const hideTests = params.tests === "hide";
  const statusFilter = LEAD_STATUSES.includes(params.status as LeadStatus) ? (params.status as LeadStatus) : null;
  const sourceFilter = LEAD_SOURCES.includes(params.source as LeadSource) ? (params.source as LeadSource) : null;

  const all = await listLeads();
  const testCount = all.filter((l) => l.isTest).length;
  const leads = hideTests ? all.filter((l) => !l.isTest) : all;

  const now = new Date();
  const today = londonDay(now);
  const month = londonMonth(now);
  const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
  const alertMs = alertMinutes() * 60 * 1000;

  const isUnanswered = (l: Lead) => l.status === "new" && now.getTime() - new Date(l.createdAt).getTime() > alertMs;
  const thisMonth = leads.filter((l) => londonMonth(new Date(l.createdAt)) === month);

  const stats = {
    today: leads.filter((l) => londonDay(new Date(l.createdAt)) === today).length,
    week: leads.filter((l) => new Date(l.createdAt).getTime() >= weekAgo).length,
    unanswered: leads.filter(isUnanswered).length,
    booked: thisMonth.filter((l) => l.status === "booked" || l.status === "done").length,
  };

  const replied = thisMonth.filter((l) => l.firstRepliedAt);
  const avgReply =
    replied.length > 0
      ? replied.reduce((sum, l) => sum + (new Date(l.firstRepliedAt!).getTime() - new Date(l.createdAt).getTime()), 0) / replied.length
      : null;

  const bySource = LEAD_SOURCES.map((s) => ({ source: s, count: thisMonth.filter((l) => l.source === s).length }))
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);
  const maxSource = Math.max(1, ...bySource.map((r) => r.count));

  const shown = leads.filter((l) => (!statusFilter || l.status === statusFilter) && (!sourceFilter || l.source === sourceFilter));

  const link = (changes: Partial<Search>) => {
    const next = { ...params, ...changes };
    const qs = new URLSearchParams(Object.entries(next).filter(([, v]) => v) as [string, string][]).toString();
    return `/dashboard${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-accent-light text-xs font-bold uppercase tracking-[0.2em]">Revved Performance</p>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold uppercase tracking-tight text-white">Enquiries</h1>
        </div>
        <div className="flex items-center gap-4">
          <ClearTestLeadsButton count={testCount} />
          <SignOutButton />
        </div>
      </header>

      {!isDatabaseConnected() && (
        <p className="mb-6 rounded-md border border-amber-400/50 bg-amber-500/10 p-3 text-sm text-amber-200">
          No database connected (DATABASE_URL is not set). Enquiries are only kept in memory and will be lost.
        </p>
      )}

      {testCount > 0 && (
        <p className="mb-6 text-sm text-muted">
          {hideTests ? `${testCount} test leads hidden. ` : `Includes ${testCount} test lead${testCount === 1 ? "" : "s"}. `}
          <Link href={link({ tests: hideTests ? undefined : "hide" })} className="text-accent-light underline underline-offset-4">
            {hideTests ? "Show them" : "Hide test leads"}
          </Link>
        </p>
      )}

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat label="New today" value={stats.today} />
        <Stat label="Last 7 days" value={stats.week} />
        <Stat label={`Unanswered > ${alertMinutes()} min`} value={stats.unanswered} tone={stats.unanswered > 0 ? "alert" : undefined} />
        <Stat label="Booked this month" value={stats.booked} tone="accent" />
      </section>

      <section className="grid md:grid-cols-[2fr_1fr] gap-4 mb-10">
        <div className="rounded-lg border border-border bg-surface/60 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Where enquiries come from (this month)</h2>
          {bySource.length === 0 ? (
            <p className="text-sm text-muted">No enquiries yet this month.</p>
          ) : (
            <ul className="space-y-2.5">
              {bySource.map((r) => (
                <li key={r.source} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
                  <span className="text-muted truncate">{SOURCE_LABELS[r.source]}</span>
                  <span className="h-2.5 rounded-full bg-border overflow-hidden">
                    <span className="block h-full rounded-full bg-accent-light" style={{ width: `${(r.count / maxSource) * 100}%` }} />
                  </span>
                  <span className="text-right font-bold text-white">{r.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-lg border border-border bg-surface/60 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white mb-2">Average first reply</h2>
          <p className="text-3xl font-heading font-bold text-white">{avgReply === null ? "–" : formatDuration(avgReply)}</p>
          <p className="mt-2 text-xs text-muted">
            This month, from enquiry to first status change. {replied.length} of {thisMonth.length} answered.
          </p>
        </div>
      </section>

      <section>
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          <Link href={link({ status: undefined })} className={`rounded-full px-3 py-1.5 border ${!statusFilter ? "bg-white text-black border-white" : "border-border text-muted hover:text-white"}`}>
            All
          </Link>
          {LEAD_STATUSES.map((s) => (
            <Link
              key={s}
              href={link({ status: s })}
              className={`rounded-full px-3 py-1.5 border ${statusFilter === s ? "bg-white text-black border-white" : "border-border text-muted hover:text-white"}`}
            >
              {STATUS_LABELS[s]}
            </Link>
          ))}
          {sourceFilter && (
            <Link href={link({ source: undefined })} className="rounded-full px-3 py-1.5 border border-accent text-white">
              {SOURCE_LABELS[sourceFilter]} ✕
            </Link>
          )}
        </div>

        {shown.length === 0 ? (
          <p className="text-muted">No enquiries to show.</p>
        ) : (
          <ul className="space-y-3">
            {shown.map((l) => {
              const unanswered = isUnanswered(l);
              const service = serviceName(l.service);
              return (
                <li
                  key={l.id}
                  className={`rounded-lg border p-4 ${unanswered ? "border-red-400/70 bg-red-500/10" : "border-border bg-surface/40"}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-white">
                        {l.name ?? (l.reg ? l.reg : METHOD_LABELS[l.contactMethod])}
                        {l.reg && l.name && <span className="ml-2 font-mono text-sm text-muted">{l.reg}</span>}
                        {l.isTest && <span className="ml-2 align-middle text-[10px] font-bold uppercase tracking-wider rounded bg-amber-400 text-black px-1.5 py-0.5">Test</span>}
                      </p>
                      <p className="text-sm text-muted">
                        {[service, METHOD_LABELS[l.contactMethod]].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted">
                      <p>{formatWhen(l.createdAt)}</p>
                      <Link href={link({ source: l.source })} className="text-accent-light hover:text-white">
                        {SOURCE_LABELS[l.source]}
                      </Link>
                      {unanswered && <p className="font-bold text-red-300">Not answered</p>}
                    </div>
                  </div>
                  {(l.phone || l.email) && (
                    <p className="mt-2 text-sm text-white">{[l.phone, l.email].filter(Boolean).join(" · ")}</p>
                  )}
                  {l.message && <p className="mt-2 text-sm text-muted whitespace-pre-line">{l.message}</p>}
                  <LeadActions
                    id={l.id}
                    status={l.status}
                    notes={l.notes}
                    phone={l.phone}
                    firstName={l.name ? l.name.split(" ")[0] : null}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="mt-10 text-xs text-muted">
        Clicks on WhatsApp and call buttons are logged as &quot;Clicked&quot;: they show intent, not a confirmed message or call.
        Enquiries are deleted automatically after 12 months.
      </p>
    </div>
  );
}
