import { isLoggedIn } from "../../../../lib/leads/auth";
import { updateLead } from "../../../../lib/leads/db";
import { LEAD_STATUSES, LeadStatus } from "../../../../lib/leads/types";

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isLoggedIn())) return Response.json({ error: "Not signed in." }, { status: 401 });
  const { id } = await ctx.params;

  let body: { status?: unknown; notes?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const changes: { status?: LeadStatus; notes?: string | null } = {};
  if (body.status !== undefined) {
    if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
      return Response.json({ error: "Unknown status." }, { status: 400 });
    }
    changes.status = body.status as LeadStatus;
  }
  if (body.notes !== undefined) {
    changes.notes = typeof body.notes === "string" ? body.notes.slice(0, 2000) || null : null;
  }

  const ok = await updateLead(id, changes);
  return ok ? Response.json({ ok: true }) : Response.json({ error: "Lead not found." }, { status: 404 });
}
