# Lead system pilot

Branch: `lead-system-pilot`. Nothing here touches `main` until approved.

## What was added
- **Enquiry capture**: every WhatsApp and call button click is logged (via `trackEvent`), plus a new enquiry form under the registration lookup on the home page. Clicks are labelled "Clicked WhatsApp / Clicked call": they show intent, not a confirmed message.
- **Source tracking**: first-touch `utm_*`, `fbclid`, `gclid`, `?src=` and referrer are read in memory on landing and sent with each enquiry. No cookies or browser storage. Sources: Google search, Google Ads, Instagram, Facebook, Meta ads, WhatsApp, other website, direct, missed call.
- **Private dashboard** at `/dashboard`: password login, stats (today, 7 days, unanswered, booked), where enquiries come from, average first reply, status buttons, notes, one-tap WhatsApp/call back. `noindex`, blocked in robots.txt, site header/footer hidden.
- **Instant reply**: on-screen confirmation after the form; optional owner email via Resend.
- **Privacy**: privacy policy updated; enquiries auto-deleted after 12 months.
- **Test leads**: visit the site with `?test=1` and every enquiry from that visit is marked TEST. Clear them with one button on the dashboard.

## Setup (Vercel)
1. Storage > Create Database > Neon > connect to this project (adds `DATABASE_URL`). The table is created automatically on first use.
2. Settings > Environment Variables: `DASHBOARD_PASSWORD`, `DASHBOARD_SECRET` (long random text), optionally `ALERT_MINUTES`, `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL`.
3. Redeploy the preview.

## Not included yet
Missed-call text-back (Twilio), paid vehicle data lookup, SMS alerts, scheduled unanswered-lead emails.
