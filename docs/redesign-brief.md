# Revved Performance redesign brief

Last updated 15 November 2026. This is the reference for improving the site on
the `redesign/car-care-and-performance` branch. The live site on `main` is the
old tuning-only version and stays untouched until the redesign is approved.

This is an improvement of the existing site, not a rebuild from scratch. Keep
its structure (data files, WhatsApp message builder, cookie banner and
analytics, legal pages, tuning page content) and change content, layout and
design.

Related:

- Brand kit: https://claude.ai/artifact/Do7yPdDT31A25nJ5X1pguj
- Social templates: https://claude.ai/artifact/ELuhiijpxYgpnyCZTtdwru
- Price sheet for Rayyan: https://claude.ai/artifact/4otvnF74eRdqoVQj8K3jW7
- Earlier design mock (superseded where this brief differs):
  https://claude.ai/artifact/RoQ3kzJxPZiSYJkA4r74ug

## 1. Positioning

Revved is a mobile car service built on convenience, with performance tuning as
its higher-value side. It comes to the customer's home or workplace across East
London & Essex, 7am to midnight. Battery call-outs run day and night.

- Core message: "We come to you. You get on with your day."
- Car care (batteries, servicing, brakes, diagnostics) leads. Quick jobs; the
  customer wants a price and a time.
- Performance (ECU remapping) has its own section and pages. It needs trust:
  Top Gear Tuning agent, health check before and after, lifetime software
  warranty (terms and conditions apply).
- Revved must not look like a typical mobile mechanic. Avoid category clichés
  in concept imagery. Real photos of Rayyan at work are welcome as proof.
- Never claim dyno testing. Revved does not offer it. Remove the existing
  "A full calibration with dyno testing." line in `components/home/Showcase.tsx`.

## 2. The enquiry (replaces the earlier five-step booking flow)

The site prepares a WhatsApp message. The customer presses Send in WhatsApp,
and Revved confirms vehicle compatibility, the full price and availability.
Nothing is paid online.

**Step 1: Request details**

- Service (or offer).
- Registration.
- Postcode.
- Preferred timing: ASAP, today, tomorrow, a specific date, or just a quote.
- Optional notes: symptoms, where the car is parked, preferred time.

**Step 2: Review and continue to WhatsApp**

- Show service, registration, postcode, timing and the pricing basis.
- Edit returns to step 1 without losing anything entered.
- The button opens WhatsApp with a readable, prefilled request.

Rules:

- Any service or offer button anywhere on the site opens the enquiry with that
  choice preselected.
- No add-ons step. Required work (such as battery registration) is included in
  the confirmed quote.
- No outside services: no vehicle lookup API, database, payments or live
  calendar. Never show an identified car or a personalised price.
- Wording: "Price agreed before you book", never "fixed price upfront" next to a
  labour-only price. "Get started in a minute", not "Booked in a minute".
  Payment is on the day, when the job is done.

## 3. Mobile first, working on desktop

Design the phone experience first, then lay it out properly for desktop. Both
must work well.

- Comfortable tap targets (44px or more) and readable text.
- Compact navigation giving access to Services, Performance and Offers.
- A persistent bottom action bar with Call and Get a quote. This replaces the
  earlier fixed WhatsApp card. Nothing WhatsApp-specific in the header.
- The enquiry opens as a sheet that scrolls and works with the keyboard open,
  with clear Back, Edit and Close controls.
- No horizontal overflow; no fixed element covering content.

## 4. Look and feel

**Colour rule: a section's colour follows its job.**

| Colour | Code | Job |
|---|---|---|
| Plum | `#693C56` | Brand moments: hero, promise band, final call. The car-care identity. |
| Cream | `#F4F2F0` | Information to read: services, prices, questions, areas. |
| Dark | `#150B12`, `#0B0609` | The Performance section and pages only. |
| Plate yellow | `#FFD500` | Small and selective: main buttons, selected states, prices, the reg plate. |
| Lighter plum | `#B06C8E` | PERFORMANCE in the wordmark on dark backgrounds. |
| Plum tint | `#D9A9C2` | Small labels on dark or plum. |

- Wordmark: REVVED and PERFORMANCE in Anton capitals, PERFORMANCE in plum (true
  plum on cream, lighter plum on dark, plum tint on plum). Use the real Revved
  logo files where a mark is needed.
- Fonts: Anton (poster lettering), Inter (everything else), Old Standard TT
  italic (small accents). Self-host all three; the build must not fetch fonts
  from Google.
- Anton appears in a few places only: the hero headline, the Performance
  headline and the final band.
- Depth comes from light and real materials, not patterns. No grids, grain or
  line patterns across backgrounds.
- Website copy is straight. Social copy is funny and cheeky.

## 5. Hero

- Message: "We come to you. You get on with your day." with services and
  coverage easy to see.
- Image: the rolled-road concept (a road rolling up to a British house at
  dusk, silver car on the driveway, plum background). File:
  `public/images/hero-road.png` once added. A refined version is coming: fixed
  centre line, larger resolution (target 1504 x 2688). Treat the current one as
  a placeholder that will be swapped.
- Match the hero background to the image's outer plum so there is no seam.
  Measured on the current image: `#572439` at the top, `#4B2131` at the bottom.
- Phone: headline in the clear plum space above the artwork. Desktop: text on
  the left, artwork on the right, never stretched or heavily cropped.
- No outlined photo cutouts.

## 6. Performance

Keep the Performance section from the redesign mock: plum glow from the top,
the oversized outlined PERFORMANCE word, "More from your car.", three glass
trust cards, the dyno-curve watermark graphic, prices, and the emissions
disclaimer. Only adjust it for mobile and consistency.

Do not use the prototype's ECU + TCU graphic or "Better. Together." layout.

## 7. Offers page

A dedicated page, linked in the navigation. Each offer's button opens the
enquiry with that offer selected. The home page shows one compact
featured-offer teaser linking here.

**ECU + TCU Stage 1 bundle: £325 (fixed)**

- Stage 1 ECU remap.
- DSG / gearbox TCU remap.
- Health check before and after.
- Lifetime software warranty (terms and conditions apply).
- Eligibility: cars with a DSG or automatic gearbox Revved can remap; confirmed
  from the registration on WhatsApp.
- Comparison shown as "what changes", not a test result:

| | Your car now | With the bundle |
|---|---|---|
| Engine | Factory settings | Stage 1 file written for your engine |
| Gearbox | Factory shift points | Re-tuned to match the remapped engine |
| Health check | None | Before and after the remap |
| Warranty | None | Lifetime software warranty (T&Cs apply) |
| Price | £400 booked separately | £325 |

- Line under it: "Send us your reg and we'll send you the expected gains for
  your car." (Rayyan checks the Top Gear Tuning portal.)

**Winter Ready Check: £45 (proposal, preview only until Rayyan agrees)**

- Battery health and cold-start test.
- Charging-system check.
- Coolant and antifreeze strength.
- Tyre tread and pressures.
- Lights and wipers check.
- Winter screenwash top-up.
- £20 off a new battery fitted on the same visit.

Keep this offer hidden on the live site until approved (a status flag in the
offers data).

## 8. Pages

| Page | Round |
|---|---|
| Home (shortened) | 1 |
| Batteries, Servicing, Brakes, Diagnostics category pages (ad landing pages) | 1 |
| Offers | 1 |
| One page per individual service | 2 |
| Performance, Stage 1, Stage 2, gearbox (restyled existing pages) | 2 |
| Guides list and article layout, plus first three articles | 2 |
| About Revved (company details, Rayyan, Top Gear Tuning agency) | 2 |

**Home page, in order:** header; hero; promise band; car care services
(cream), with the dead-battery line; featured offer teaser; Performance (dark);
recent work (real photos and reviews, no mention of Google); areas (cream);
questions; final call (plum); footer with links, contact icons and the
registered company line.

First guides: how long a car battery lasts; minor or major service; what a
Stage 1 remap changes.

## 9. Services and prices

| Service | Price |
|---|---|
| Battery replacement | From £99 fitted; 3-year warranty |
| Battery health check | £20 |
| Emergency jump-start | £45 |
| Alternator and charging-system check | £35 |
| Battery registration and BMS reset | £25 |
| Starting-system diagnosis | £40 |
| Minor service | Labour £50 plus parts |
| Major service | Labour £70 plus parts |
| Brake pads | Labour £100 plus parts |
| Full vehicle health check | £75 |
| Pre-purchase inspection | £99 |
| Pre-MOT check | £65 |
| Stage 1 remap (OBD) | From £250 |
| Stage 1 remap (bench) | From £350 |
| Stage 2 remap | From £300 |
| Gearbox (DSG / TCU) remap | £150 |
| Remap add-ons | £50 each |
| Emissions add-ons (off-road use, by enquiry) | £50 each |

Minor service: oil and oil filter, safety check, fluid top-ups, service light
reset. Major service adds air filter, cabin pollen filter, spark plugs and
washer fluid. The emissions page keeps its disclaimer, sits under Performance
only, and ads never point to it.

## 10. Motion

Coordinated hero entrance, subtle section reveals, responsive button states and
a smooth enquiry-sheet transition. Keep normal scrolling, fast interaction and
`prefers-reduced-motion` support. Animation must never delay an enquiry.

## 11. How the work is delivered

- Build on the `redesign/car-care-and-performance` branch; each push gives a
  Vercel preview link for review.
- Round 1: foundations (colour rule, fonts, mobile menu, bottom bar, footer),
  the two-step enquiry, the shortened home page, the Offers page, and the four
  car care category pages.
- Round 2: individual service pages, Performance pages, guides, About, SEO and
  speed checks, then merge to `main` on approval.
- The Next.js version in this repo differs from older versions: read the guide
  in `node_modules/next/dist/docs/` before writing code (see `AGENTS.md`).

## 12. Still to come

- From Rayyan: battery prices by type, the 90-minute postcodes, parts and labour
  warranty, street parking, agreement on the Winter Ready Check.
- Refined hero image; a battery photo; real job photos.
- The two reviews: wording and first names.

## 13. After the site

A 90-day plan covering Meta ads, garage referral partnerships, content and
local SEO, with weekly numbers: ad spend and cost per lead, quotes and jobs
booked, average job value, new reviews, garages contacted and referred jobs,
pages and guides published.
