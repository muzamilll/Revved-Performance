# Revved Performance redesign brief

Last updated 24 November 2026. This is the reference for improving the site on
the `redesign/car-care-and-performance` branch. The live site on `main` is the
old tuning-only version and stays untouched until the redesign is approved.

This is an improvement of the existing site, not a rebuild from scratch. Keep
its structure (data files, WhatsApp message builder, cookie banner and
analytics, legal pages, tuning page content) and change content, layout and
design.

Related:

- Brand kit: https://claude.ai/artifact/Do7yPdDT31A25nJ5X1pguj
- Social templates: https://claude.ai/artifact/ELuhiijpxYgpnyCZTtdwru
- Price sheet (source of truth for prices, Google Sheet on info@revved.uk):
  https://docs.google.com/spreadsheets/d/1hZ4v0JXgwYDXe2qCKzzn1Wu9hWq94WybHnRGV95zGZA/edit
  (the older Claude price sheet artifact is out of date; do not use it)
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
Payment is taken on the day. (The line "Nothing is paid online" was removed
from the site on 15 Nov.)

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
- One enquiry can hold several jobs (added 15 Nov): add, remove and review
  each with its price; the WhatsApp message lists them all.
- No add-ons step. Remap and emissions add-ons are bookable items of their own
  (emissions add-ons carry the road-legality note).
- No outside services: no vehicle lookup API, database, payments or live
  calendar. Never show an identified car or a personalised price.
- Wording: "Price agreed before you book", never "fixed price upfront" next to a
  labour-only price. Never say "labour" in customer-facing copy: show a
  discreet "from" before the price instead (Rayyan's decision, 22 Nov). Where
  parts are extra, say "Your price depends on your car and is agreed before we
  start". "Get started in a minute", not "Booked in a minute".
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

## 4a. Personality: photo world, Lemonade's structure (decided 24 Nov)

Reference: lemonade.com/car. We keep real photos for heroes and page headers
(car work is trusted when it looks real) and borrow Lemonade's page structure
and small touches of personality. We do not copy its drawn illustration style.
Every item below is built in code; none needs an AI image.

- **"If..." cards** (home, after the promise band). People recognise their
  situation before they know the service name. Four cards, each linking to the
  matching page:
  - "If your car won't start" -> Batteries
  - "If a warning light comes on" -> Diagnostics (mention the DPF light)
  - "If you're buying a used car" -> Pre-purchase inspection
  - "If you want more power" -> Performance
  One short line under each heading. Icons from one existing line-icon set
  (one hand, same stroke weight), in plum with a single yellow detail. No mixed
  icon styles, no emoji.
- **Small labels.** Little yellow tags on cards and prices, used sparingly:
  "24/7", "At your door", "Same day". Facts only, nothing Rayyan has not
  confirmed.
- **Handwritten notes.** At most two on the home page, e.g. "yes, on your
  driveway" with a small hand-drawn arrow. Use one self-hosted handwriting font.
  Decorative only: real information never lives in a note. Hidden from screen
  readers (aria-hidden).
- **WhatsApp chat strip ("How it works").** A phone showing a short chat that
  appears message by message as it scrolls into view:
  1. Customer: "Car won't start, I'm in Romford"
  2. Revved: "No problem. Send your reg and we'll confirm the price."
  3. Revved: "On our way."
  4. Revved: "All done. New battery fitted, 3-year warranty."
  Built in HTML/CSS, not a screenshot. Label it as an example. No ETAs or
  times we can't promise. Ends with the WhatsApp button.
- **Coverage map (areas section).** A simple drawn map: Ilford pin in the
  centre, a 20-mile ring, town names placed roughly in their direction. Plum
  lines on cream, yellow Ilford pin. The ring draws on scroll. Sits above the
  grouped town list in "Areas we cover"; the list stays as real text for
  search.
- **"Good to know" questions.** Questions as a grid of cards on desktop (one
  column on phones) instead of a plain accordion, if it reads better. Keep the
  FAQ structured data.
- **Skyline closing band (final call).** Layered East London rooftop
  silhouettes (terraces, a chimney stack, streetlights, one car) in deepening
  plums at dusk. Layers move at slightly different speeds on scroll on
  desktop; static on phones and with reduced motion. "Request a booking"
  button in yellow on top. Simple flat shapes in SVG; if it looks clip-arty,
  swap for a flat image Muzamil supplies.

Restraint rule: Lemonade works because the page is calm and the colour is
rare. Yellow stays for buttons, prices, tags and the Ilford pin.

## 5. Hero

- Message: "We come to you. You get on with your day." with services and
  coverage easy to see. Both lines in white (decided 24 Nov), so the promise
  stands out against the plum.
- The link under the buttons reads "Want more power? See Performance"
  (decided 24 Nov).
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

## 5a. Trust lines (decided 24 Nov)

The generic bar ("Price agreed before you book, At your home or work...") is
replaced. Each landing page gets its own line, so the same promise is not
repeated on every page. Facts only; nothing Rayyan has not confirmed.

| Page | Trust line |
|---|---|
| Home | No lift to the garage. No waiting room. No lost day. |
| Batteries (and battery job pages) | 24/7 call-outs · 3-year battery warranty · Fitted at your door |
| Servicing (and job pages) | Done on your driveway · Service light reset included · Price confirmed before we start |
| Brakes (and job pages) | Fitted where the car is parked · Safety check after every job · Price confirmed before we start |
| Diagnostics (and job pages) | Warning lights read where the car is · Pre-purchase checks at the seller's · Explained in plain English |
| Performance (and remap pages) | Top Gear Tuning agent · Health check before and after · Lifetime software warranty |

## 6. Performance

Keep the Performance section from the redesign mock: plum glow from the top,
the oversized outlined PERFORMANCE word, "More from your car.", three glass
trust cards, the dyno-curve watermark graphic, prices, and the emissions
disclaimer. Only adjust it for mobile and consistency.

The emissions add-ons stay listed on the Performance page (decided 24 Nov).
Point remap ads at `/performance/stage-1-remap`, not `/performance`.

Rayyan confirmed (24 Nov) that the original ECU software is always saved
before a remap, so the car can go back to standard. The site may say so.

Do not use the prototype's ECU + TCU graphic or "Better. Together." layout.

## 7. Offers page

A dedicated page, linked in the navigation. Each offer's button opens the
enquiry with that offer selected. The home page shows one compact
featured-offer teaser linking here.

**ECU + TCU Stage 1 bundle: £329 (fixed, updated by Rayyan 22 Nov)**

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

- Line under it: "Send us your reg and we'll send you the expected gains for
  your car." (Rayyan checks the Top Gear Tuning portal.)
- Open question for Rayyan: at current prices, Stage 1 OBD (£179) plus a
  gearbox remap (£150) also comes to £329, so the bundle shows no saving. Do
  not show a "booked separately" price until he decides.

The Winter Ready Check offer was dropped on 15 Nov. Its checks are now free
with a battery replacement.

## 8. Pages

| Page | Round |
|---|---|
| Home (shortened) | 1 |
| Batteries, Servicing, Brakes, Diagnostics category pages (ad landing pages) | 1 |
| Offers | 1 |
| One page per individual service | 2 |
| Performance, Stage 1, Stage 2, gearbox (restyled existing pages) | 2 |
| Guides list and article layout, plus first three articles | 2 |
| About Revved (company voice: no individual named; company details, Top Gear Tuning agency) | 2 |
| Revved for business (trade page at /business, linked from the footer) | 2 |

**Home page, in order:** header; hero; promise band; "If..." cards; car care
services (cream), with the dead-battery line; WhatsApp chat strip ("How it
works"); featured offer teaser; Performance (dark); recent work (real photos
and reviews, no mention of Google); areas with the coverage map (cream);
questions ("Good to know"); skyline final call (plum); footer with links,
contact icons and the registered company line. See 4a.

First guides: see "Guides (blogs)" below for the order.

**Revved for business (trade page), replacing "For garages".** Decided 24 Nov.
"Jobs garages turn away" was too narrow. The page now matches the partner
pilot plan, so the website and the outreach say the same thing. Route
`/business`; `/for-garages` redirects to it. Linked in the footer, not the main
menu.

- Headline: "Your mobile specialist, on call." Sub-line: "Tuning, diagnostics,
  batteries and servicing for businesses across East London & Essex. We come
  to your premises."
- A section for each business type in the pilot plan:
  - Independent garages and MOT centres: tuning, DPF and coding they don't
    have the kit for. They book Revved at a trade price and bill their own
    customer; the customer stays theirs.
  - Used-car dealers: diagnostics and pre-sale checks, batteries on forecourt
    stock, DPF cleans before sale. A trade account.
  - PCO hire fleets: servicing, brakes and batteries that keep rental cars
    earning. A trade account. Car care only, no remaps.
  - Detailers and tyre shops: refer a customer who needs a battery, a service
    or a remap; Revved quotes, does the job and handles aftercare; the partner
    earns a fee on completed, paid jobs.
- Three ways to work together, as in the pilot plan: book us at a trade price,
  refer a customer and earn a fee, or recommend each other.
- Trade rates and referral fees on request. No prices on the page.
- One action: "Become a trade partner", opening WhatsApp with "Trade enquiry"
  and the business type filled in.
- A short section at the bottom: "Car clubs and creators: let's work
  together", same WhatsApp button.
- Search terms to target: mobile remapping for garages, trade ECU remapping
  East London, mobile mechanic for car dealers, fleet servicing East London.

**Guides (blogs), decided 24 Nov.** Each guide answers something people search
when they are about to book, and ends with the matching service and a booking
button. Not generic articles. Search volumes are not checked yet (no Semrush
API units); confirm with Search Console data after launch. Order to write:

1. DPF warning light: what it means and what to do.
2. Car won't start: battery, starter or alternator?
3. Is ECU remapping safe for my engine?
4. Does a remap affect my car insurance?
5. Stage 1 vs Stage 2 remap: what's the difference?
6. Pre-purchase inspection: what to check before buying a used car.
7. Minor or major service: which does my car need?
8. How long does a car battery last?

These replace the earlier first three (battery life, minor or major service,
what a Stage 1 changes), which move down the list.

**Areas we cover (decided 24 Nov).** The old row of 20 town chips made it look
as if Revved only goes to those towns. Rayyan's rule: anywhere within 20 miles
of Ilford (IG1). Further out: ask on WhatsApp.

- Headline: "Anywhere within 20 miles of Ilford." Keep "East London. Essex.
  Your door." as the line above or below it.
- A simple radius graphic (Ilford in the middle, a 20-mile circle) instead of
  only chips.
- Towns grouped by region (on phones, each region folds open), so people find
  their own town. All are within 20 miles in a straight line:
  - East London: Barking, Dagenham, East Ham, Beckton, Stratford, West Ham,
    Leyton, Leytonstone, Walthamstow, Wanstead, Woodford, Redbridge, Hainault,
    Chingford, Bow, Poplar, Canary Wharf, Hackney, Shoreditch, Stoke Newington.
  - Romford and Havering: Romford, Collier Row, Gidea Park, Harold Wood,
    Hornchurch, Elm Park, Upminster, Rainham.
  - Essex: Chigwell, Buckhurst Hill, Loughton, Theydon Bois, Abridge, Epping,
    Ongar, Waltham Abbey, Harlow, Brentwood, Shenfield, Ingatestone,
    Billericay, Basildon, Wickford, Grays, Chafford Hundred, Lakeside,
    Purfleet, South Ockendon, Tilbury, Stanford-le-Hope.
  - North London and Hertfordshire: Tottenham, Edmonton, Enfield, Wood Green,
    Palmers Green, Southgate, Barnet, Islington, Camden, Cheshunt, Hoddesdon,
    Hertford, Ware, Hatfield, Potters Bar.
  - Central, South East London and Kent: City of London, Westminster,
    Greenwich, Woolwich, Thamesmead, Eltham, Lewisham, Catford, Peckham,
    Brixton, Welling, Bexleyheath, Erith, Sidcup, Bromley, Orpington, Croydon,
    Dartford, Bluewater, Swanley, Gravesend.
  - West London: Wembley, Ealing, Harrow, Richmond, Kingston, Wimbledon.
- Closing line with a WhatsApp button: "Not on the list, or a bit further out?
  Ask us on WhatsApp and we'll tell you straight away."
- Everywhere else the site mentions coverage, it says "within 20 miles of
  Ilford", not a short town list.
- Later (local SEO): a page for each main town, starting with Romford,
  Ilford, Barking, Dagenham, Hornchurch, Brentwood and Basildon.

## 9. Services and prices

Prices as agreed with Rayyan on 22 Nov 2026. The price sheet (linked at the top)
wins if anything here differs. "From" prices are labour; parts are agreed
before the job.

| Service | Price shown | Note |
|---|---|---|
| Battery fitting | From £99 | Battery priced for the car on WhatsApp; 3-year warranty on the battery |
| Battery registration and BMS reset | £40 | Separate from fitting |
| Battery health check | £20 | |
| Emergency jump-start | £45 | 24/7 |
| Alternator and charging-system check | £35 | |
| Starting-system diagnosis | £40 | |
| Minor service | From £50 | Parts extra, agreed before the job |
| Major service | From £70 | Parts extra, agreed before the job |
| Brake pads | From £100 | Parts extra, agreed before the job |
| DPF service | £120 | |
| Full vehicle health check | £75 | |
| Pre-purchase inspection | £99 | |
| Pre-MOT check | £65 | A diagnostic check, not an MOT |
| Stage 1 remap (OBD) | From £179 | Was £250 |
| Stage 1 remap (bench) | From £259 | Was £350 |
| ECU + TCU Stage 1 bundle | £329 | See Offers |
| Stage 2 remap | From £300 | Bench unlock included |
| Gearbox (DSG / TCU) remap | £150 | |
| Software solutions | £149 | Coding, ECU updates, fault investigation; EGR, DPF, AdBlue and swirl flap solutions, off-road and competition use only |
| Remap add-ons | £50 each | |
| Emissions add-ons (off-road use, by enquiry) | £50 each | |

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

- From Rayyan: what Software Solutions (£149) is for compared with the £50
  emissions add-ons (working idea: rename it "Coding & ECU software (no
  remap)", with "Already booking a remap? Add-ons are £50 each"), battery prices by type, the 90-minute postcodes, parts and labour
  warranty, street parking, the bundle comparison (see Offers).
- Refined hero image; a battery photo.
- Real job photos for Recent work: Mercedes C63 AMG, BMW 530d M Sport and
  Peugeot Partner are in Google Drive (content > Ready to post, folders 03-05).
  Do not show customers' number plates.
- The two reviews: wording and first names.

## 13. After the site

A 90-day plan covering Meta ads, garage referral partnerships, content and
local SEO, with weekly numbers: ad spend and cost per lead, quotes and jobs
booked, average job value, new reviews, garages contacted and referred jobs,
pages and guides published.

Parked ideas, to pick up once the site is live (so Revved does not rely on ads
alone):

- Niche campaigns. First idea: a Driver Deal for Uber and PCO drivers, who lose
  money every hour the car is off the road. Car care only, not remaps. Other
  niches: tradespeople with vans, delivery drivers.
- Blogs and guides that answer real searches: dead battery, DPF warning light,
  is remapping safe, remapping and insurance, Stage 1 vs Stage 2, pre-purchase
  checklist, mobile mechanic vs garage, mobile remapping for garages. Check
  search volumes first.

## 14. Hosting

The live site is on Vercel's free Hobby plan, which does not allow commercial
use. Move it (Cloudflare, or a paid Vercel plan) before or at launch.
