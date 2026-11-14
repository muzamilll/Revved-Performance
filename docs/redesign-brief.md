# Revved Performance redesign brief

Agreed on 13 November 2026. This is the reference for rebuilding the site on the
`redesign/car-care-and-performance` branch. The live site on `main` is the old
tuning-only version and stays untouched until the redesign is approved.

- Design mock (home page and booking flow): https://claude.ai/artifact/RoQ3kzJxPZiSYJkA4r74ug
- Price sheet for Rayyan to complete: https://claude.ai/artifact/4otvnF74eRdqoVQj8K3jW7

## 1. Positioning

Revved is a mobile car service built on convenience, with performance tuning as
its higher-value side.

- Headline: "We come to you." Supporting line: "You get on with your day."
- Car care (batteries, servicing, brakes, diagnostics) leads the site. These are
  quick jobs that need a price and a slot.
- Performance (ECU remapping) has its own distinct section and pages. It needs
  trust: Top Gear Tuning agent, health check before and after, lifetime software
  warranty (terms and conditions apply).
- Area wording is "East London & Essex", not individual towns in the header.
- Hours: slots from 7am to midnight. Battery call-outs run day and night.

## 2. How a booking works

The site collects the order; WhatsApp confirms it. Nothing is paid online.

No outside services for now. Sending the order to WhatsApp is deliberate: it
avoids any API (vehicle lookup, payments, booking calendars, email providers)
until the business has jobs coming in. The reg box records the registration and
passes it along; it does not look the car up, so prices shown are the same for
every car and Revved confirms the price for that car on WhatsApp.

1. Enter registration.
2. Choose a job. Labour-only prices are marked "plus parts".
3. Add-ons.
4. Postcode and where the car is parked (driveway, private car park, street).
5. Preferred day and time, or "as soon as possible".
6. Summary, then a button that opens WhatsApp with the order filled in.

Rules for the wording:

- Say "Price agreed before you book", never "fixed price upfront" next to a
  labour-only price.
- Say "Get started in a minute", not "Booked in a minute". Choosing a time is a
  preference; Revved confirms on WhatsApp.
- Payment is on the day, when the job is done.

## 3. Look and feel

| Role | Value | Use |
|---|---|---|
| Ink (background) | `#150B12` | Dark sections |
| Deep black | `#0B0609` | Performance section, footer |
| Plum | `#693C56` | Promise band, final call band, glows |
| Plate yellow (accent) | `#FFD500` | Buttons, prices, the reg plate, PERFORMANCE in the logo |
| Cream | `#F4F2F0` | Light sections and text on dark |
| Plum tint | `#D9A9C2` | Small labels on dark |

- Fonts: Anton (poster lettering), Inter (everything else), Old Standard TT
  italic (small accents). Self-host all three; do not load them from Google at
  build time.
- Anton is used in three places only: the hero headline, the Performance
  headline and the final plum band. Other headings are Inter, medium weight.
- Depth comes from soft plum light, one oversized outlined word and one
  meaningful graphic (the dyno curve in Performance). No grids, grain or line
  patterns across backgrounds.
- Balance: mostly dark, with three light sections on the home page (services,
  areas, guides).
- Logo wordmark: REVVED in cream, PERFORMANCE in yellow, same lettering.
- A fixed yellow "WhatsApp Revved / Skip the form. Talk to us." card sits at the
  bottom right of every page. There is no WhatsApp button in the header.
- Site copy is straight. The dry one-liners are for social media only.

## 4. Home page, top to footer

1. Header: logo, Batteries, Servicing, Brakes, Diagnostics, Performance, About,
   phone number with icon.
2. Hero: headline, reg box, "See my prices", link to Performance, photo in an
   angled cutout with a yellow offset.
3. Promise band: Price agreed before you book, At your home or work, 3-year
   battery warranty, Talk directly to Revved.
4. Everyday car care (light): four cards with icons and starting prices, plus
   "Not sure what's wrong?".
5. How it works: three steps.
6. Dead battery: at your door within 90 minutes, day or night.
7. Performance: outlined word, headline, three trust cards, prices, emissions
   disclaimer.
8. Recent work: real job photos and two reviews (no mention of Google).
9. Areas (light): "East London. Essex. Your door." with town chips.
10. Questions: six answers.
11. Guides (light): three article cards.
12. Final call: plum band, "We come to you.", one button, WhatsApp link.
13. MOT and service reminders by email. On hold: sending email needs an
    outside service, which the no-API rule excludes for now.
14. Footer: Car care, Performance and Revved links, contact details with icons,
    and the registered company line (required for a limited company).

Company details are not shown on the home page apart from that footer line. A
separate About Revved page carries the rest.

## 5. Services and prices known so far

| Service | Price |
|---|---|
| Battery replacement | From £99 fitted; exact price per battery type to come |
| Battery health check | £20 |
| Emergency jump-start | £45 |
| Alternator and charging-system check | £35 |
| Battery registration and BMS reset | £25 |
| Starting-system diagnosis | £40 |
| Minor service | Labour £50 plus parts |
| Major service | Labour £70 plus parts |
| Brake pads | Labour £100 plus parts (per axle to be confirmed) |
| Full vehicle health check | £75 |
| Pre-purchase inspection | £99 |
| Pre-MOT check | £65 |
| Stage 1 remap (OBD) | From £250 |
| Stage 1 remap (bench) | From £350 |
| Remap add-ons | £50 each |
| Emissions add-ons (off-road use, by enquiry) | £50 each |

Minor service includes oil and oil filter change, safety check, fluid top-ups
and service light reset. Major service adds engine air filter, cabin pollen
filter, spark plugs and washer fluid top-up.

Batteries carry a 3-year warranty. The emissions page keeps its disclaimer and
is listed under Performance only; ads should not point to it.

## 6. Still needed

- From Rayyan: battery prices by type, the 90-minute postcodes, parts and
  labour warranty, the answer on street parking, whether brake labour is per
  axle.
- Photos: a sharper REV WHO hero photo, a battery photo, real job photos.
  AI-made images are fine as illustrations but not in Recent work.
- The two reviews: wording and first names.
- Brand kit: https://claude.ai/artifact/Do7yPdDT31A25nJ5X1pguj

## 7. Build stages

1. Foundations: colours, self-hosted fonts, section styles, header, footer,
   fixed WhatsApp card.
2. Service data from the price sheet, grouped as Car care and Performance.
3. Home page with spacing, hover effects and scroll animation.
4. Booking flow ending in the pre-filled WhatsApp message.
5. Service pages and restyled Performance pages.
6. Guides layout.
7. SEO, speed and mobile checks.
8. Review on the preview link, then merge to `main`.

Animation should be light on phones (fades, the plate typing itself, prices
counting up, instant step changes) with extra effects on desktop only.

## 8. After the site

A 90-day plan covering Meta ads, garage referral partnerships, content and
local SEO, with weekly KPIs: ad spend and cost per lead, quotes and jobs
booked, average job value, new reviews, garages contacted and referred jobs,
pages and guides published.
