import { isLoggedIn } from "../../../../lib/leads/auth";
import { deleteTestLeads } from "../../../../lib/leads/db";

// Clears every lead marked as a test (created by visiting the site with ?test=1).
export async function DELETE() {
  if (!(await isLoggedIn())) return Response.json({ error: "Not signed in." }, { status: 401 });
  const removed = await deleteTestLeads();
  return Response.json({ ok: true, removed });
}
