"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { LEAD_STATUSES, LeadStatus, STATUS_LABELS } from "../../lib/leads/types";

export function LoginForm({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setBusy(true);
    setError(null);
    const res = await fetch("/api/dashboard/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (res.ok) {
      router.refresh();
    } else {
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      setError(json.error ?? "Could not sign in.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <h1 className="text-3xl font-heading font-extrabold uppercase tracking-tight text-white">Lead dashboard</h1>
      {!configured && (
        <p className="text-sm text-amber-300">Set DASHBOARD_PASSWORD and DASHBOARD_SECRET in the environment to enable sign-in.</p>
      )}
      <input
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Password"
        className="w-full h-12 px-4 bg-surface text-white rounded-md border border-border focus:border-accent focus:outline-none"
        aria-label="Password"
      />
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
      <button
        type="submit"
        disabled={busy || !configured}
        className="w-full h-12 rounded-md bg-accent text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/dashboard/login", { method: "DELETE" });
        router.refresh();
      }}
      className="text-xs text-muted underline underline-offset-4 hover:text-white"
    >
      Sign out
    </button>
  );
}

export function ClearTestLeadsButton({ count }: { count: number }) {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);
  if (count === 0) return null;
  return (
    <button
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/leads/test", { method: "DELETE" });
        setBusy(false);
        router.refresh();
      }}
      className="text-xs rounded-md border border-border px-3 py-2 text-muted hover:text-white hover:border-muted disabled:opacity-50"
    >
      {busy ? "Clearing…" : `Clear ${count} test lead${count === 1 ? "" : "s"}`}
    </button>
  );
}

// UK numbers: 07… becomes 447… for wa.me and tel: links
function intl(phone: string): string | null {
  const digits = phone.replace(/[^\d+]/g, "");
  if (/^07\d{9}$/.test(digits)) return `44${digits.slice(1)}`;
  if (/^\+?44\d{10}$/.test(digits)) return digits.replace(/^\+/, "");
  if (/^\+\d{10,15}$/.test(digits)) return digits.slice(1);
  return null;
}

export function LeadActions({
  id,
  status,
  notes,
  phone,
  firstName,
}: {
  id: string;
  status: LeadStatus;
  notes: string | null;
  phone: string | null;
  firstName: string | null;
}) {
  const router = useRouter();
  const [current, setCurrent] = React.useState<LeadStatus>(status);
  const [note, setNote] = React.useState(notes ?? "");
  const [saving, setSaving] = React.useState(false);
  const number = phone ? intl(phone) : null;

  async function save(changes: { status?: LeadStatus; notes?: string }) {
    setSaving(true);
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(changes),
    });
    setSaving(false);
    router.refresh();
  }

  const greeting = encodeURIComponent(`Hi${firstName ? ` ${firstName}` : ""}, it's Revved Performance about your enquiry.`);

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {LEAD_STATUSES.map((s) => (
          <button
            key={s}
            disabled={saving}
            onClick={() => {
              setCurrent(s);
              void save({ status: s });
            }}
            className={`text-xs rounded-full px-3 py-1.5 border transition-colors ${
              current === s ? "bg-accent border-accent text-white" : "border-border text-muted hover:text-white hover:border-muted"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>
      {number && (
        <div className="flex gap-2">
          <a
            href={`https://wa.me/${number}?text=${greeting}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs rounded-md bg-surface border border-border px-3 py-2 text-white hover:border-accent"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={`tel:+${number}`}
            className="inline-flex items-center gap-1.5 text-xs rounded-md bg-surface border border-border px-3 py-2 text-white hover:border-accent"
          >
            <Phone className="w-4 h-4" /> Call
          </a>
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note"
          className="flex-1 h-9 px-3 text-sm bg-surface text-white rounded-md border border-border focus:border-accent focus:outline-none"
          aria-label="Note"
        />
        <button
          disabled={saving || note === (notes ?? "")}
          onClick={() => void save({ notes: note })}
          className="text-xs rounded-md border border-border px-3 text-muted hover:text-white disabled:opacity-40"
        >
          Save
        </button>
      </div>
    </div>
  );
}
