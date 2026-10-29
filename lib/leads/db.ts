import "server-only";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";
import { Lead, LeadStatus, NewLead } from "./types";

// Enquiries are kept for this many months, then deleted automatically.
export const RETENTION_MONTHS = 12;

type Row = {
  id: string;
  created_at: string | Date;
  contact_method: Lead["contactMethod"];
  status: LeadStatus;
  source: Lead["source"];
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  landing_page: string | null;
  page: string | null;
  service: string | null;
  reg: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  message: string | null;
  notes: string | null;
  first_replied_at: string | Date | null;
  is_test: boolean;
};

const iso = (v: string | Date | null) => (v ? new Date(v).toISOString() : null);

function toLead(r: Row): Lead {
  return {
    id: r.id,
    createdAt: iso(r.created_at)!,
    contactMethod: r.contact_method,
    status: r.status,
    source: r.source,
    utmSource: r.utm_source,
    utmMedium: r.utm_medium,
    utmCampaign: r.utm_campaign,
    referrer: r.referrer,
    landingPage: r.landing_page,
    page: r.page,
    service: r.service,
    reg: r.reg,
    name: r.name,
    phone: r.phone,
    email: r.email,
    message: r.message,
    notes: r.notes,
    firstRepliedAt: iso(r.first_replied_at),
    isTest: r.is_test,
  };
}

export function isDatabaseConnected(): boolean {
  return !!process.env.DATABASE_URL;
}

// ---------------------------------------------------------------------------
// Fallback store for local development without a database. Data lives in this
// server process only, so it is NOT suitable for a deployed site.
// ---------------------------------------------------------------------------
const memory: { leads: Lead[] } = (globalThis as unknown as { __revvedLeads?: { leads: Lead[] } }).__revvedLeads ?? {
  leads: [],
};
(globalThis as unknown as { __revvedLeads?: { leads: Lead[] } }).__revvedLeads = memory;

let tableReady: Promise<void> | null = null;

function db() {
  return neon(process.env.DATABASE_URL!);
}

// Creates the table on first use, so no separate migration step is needed.
function ensureTable(): Promise<void> {
  if (!tableReady) {
    const sql = db();
    tableReady = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS leads (
        id text PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        contact_method text NOT NULL,
        status text NOT NULL DEFAULT 'new',
        source text NOT NULL,
        utm_source text,
        utm_medium text,
        utm_campaign text,
        referrer text,
        landing_page text,
        page text,
        service text,
        reg text,
        name text,
        phone text,
        email text,
        message text,
        notes text,
        first_replied_at timestamptz,
        is_test boolean NOT NULL DEFAULT false
      )`;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
    })().catch((error) => {
      tableReady = null;
      throw error;
    });
  }
  return tableReady;
}

export async function insertLead(input: NewLead): Promise<string> {
  const id = randomUUID();
  if (!isDatabaseConnected()) {
    memory.leads.unshift({
      ...input,
      id,
      createdAt: new Date().toISOString(),
      status: "new",
      notes: null,
      firstRepliedAt: null,
    });
    return id;
  }
  await ensureTable();
  const sql = db();
  await sql`INSERT INTO leads (
      id, contact_method, source, utm_source, utm_medium, utm_campaign, referrer, landing_page, page,
      service, reg, name, phone, email, message, is_test
    ) VALUES (
      ${id}, ${input.contactMethod}, ${input.source}, ${input.utmSource}, ${input.utmMedium}, ${input.utmCampaign},
      ${input.referrer}, ${input.landingPage}, ${input.page}, ${input.service}, ${input.reg}, ${input.name},
      ${input.phone}, ${input.email}, ${input.message}, ${input.isTest}
    )`;
  return id;
}

export async function listLeads(): Promise<Lead[]> {
  if (!isDatabaseConnected()) return [...memory.leads];
  await ensureTable();
  const sql = db();
  // Retention: anything older than the retention period is deleted before listing.
  await sql`DELETE FROM leads WHERE created_at < now() - make_interval(months => ${RETENTION_MONTHS})`;
  const rows = (await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 1000`) as Row[];
  return rows.map(toLead);
}

export async function updateLead(id: string, changes: { status?: LeadStatus; notes?: string | null }): Promise<boolean> {
  if (!isDatabaseConnected()) {
    const lead = memory.leads.find((l) => l.id === id);
    if (!lead) return false;
    if (changes.status) {
      if (changes.status !== "new" && !lead.firstRepliedAt) lead.firstRepliedAt = new Date().toISOString();
      lead.status = changes.status;
    }
    if (changes.notes !== undefined) lead.notes = changes.notes;
    return true;
  }
  await ensureTable();
  const sql = db();
  if (changes.status) {
    // The first move away from "new" counts as the first reply.
    const rows = await sql`UPDATE leads SET
        status = ${changes.status},
        first_replied_at = CASE
          WHEN first_replied_at IS NULL AND ${changes.status} <> 'new' THEN now()
          ELSE first_replied_at END
      WHERE id = ${id} RETURNING id`;
    if (rows.length === 0) return false;
  }
  if (changes.notes !== undefined) {
    const rows = await sql`UPDATE leads SET notes = ${changes.notes} WHERE id = ${id} RETURNING id`;
    if (rows.length === 0) return false;
  }
  return true;
}

export async function deleteTestLeads(): Promise<number> {
  if (!isDatabaseConnected()) {
    const before = memory.leads.length;
    memory.leads = memory.leads.filter((l) => !l.isTest);
    return before - memory.leads.length;
  }
  await ensureTable();
  const sql = db();
  const rows = await sql`DELETE FROM leads WHERE is_test = true RETURNING id`;
  return rows.length;
}
