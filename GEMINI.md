# REVVED AUTOMOTIVE: GEMINI CODING RULES

Read this file before every task. If a prompt conflicts with this file, stop and ask.

---

# 1. Project and priorities

Revved Automotive is a premium mobile automotive service (ECU remapping and diagnostics) based in Romford, serving East London and Essex.

The website is a local acquisition and conversion site. The primary conversion is a WhatsApp message.

Audience: car enthusiasts AND ordinary owners with little technical knowledge. Explain in plain English first and put technical detail behind "show more". Never assume knowledge.

Priorities, in order:

1. Correctness. Never invent facts.
2. Premium feel: smooth, fast, futuristic, restrained. This is never compromised for delivery speed.
3. WhatsApp conversion, especially on mobile.
4. Easy for an AI assistant to maintain by editing data files.

Launch is LEAN. Only the routes in section 3 exist. Do not add pages, features or libraries that were not asked for. Follow section 16 (simplicity and conversion) on every page.

---

# 2. Stack

* The project is already scaffolded. Do NOT scaffold again. Use the versions in package.json and check current Next.js docs for conventions (for example `params` and `searchParams` are async).
* Next.js App Router, React, TypeScript (strict), Tailwind CSS v4.
* Tailwind v4 is configured in CSS with `@theme`. Do not create `tailwind.config.js`.
* Icons: Lucide React. Motion: the `motion` package, under the rules in section 4.
* No shadcn, Radix or other UI libraries unless a prompt asks. Use native `<dialog>` and `<details>`.
* Do not add other dependencies without a clear reason, and list any you add in your report.

---

# 3. Architecture and routes

Components = presentation. Data = content and business facts. Lib = logic and integrations. Routes = page entry points.

Routes that exist at launch (nothing else):

```text
/                  app/page.tsx
/services          app/services/page.tsx
/services/[slug]   app/services/[slug]/page.tsx
/offers            app/offers/page.tsx
/offers/[slug]     app/offers/[slug]/page.tsx
/privacy           app/privacy/page.tsx
/cookies           app/cookies/page.tsx
sitemap.ts, robots.ts, not-found.tsx, opengraph-image.tsx
```

Folders: `components/{layout,ui,home,services,offers,vehicle,trust}`, `data/`, `lib/{whatsapp,analytics,offers,vehicle,seo}`, `types/`, `public/{images,logo}`.

Rules:

* Never put a whole page in one file. Keep components small.
* Never duplicate service or offer pages. The dynamic routes render from data.
* Business facts (prices, copy, areas, contact details) live in `data/`, never in components.
* Adding a service or an offer must need only a new record in `data/`, no code change.

---

# 4. Brand and design (LOCKED)

Do not redesign the identity. Do not add colours. If one is truly needed, document why in README.md.

```text
Carbon Black  #09090B
Revved Plum   #693C56
Light Plum    #9B607D
Off White     #F4F2F0
Gunmetal      #25252A
Silver        #A7A7AA
```

Feel: futuristic, minimal, premium, cinematic, technical. It must look like a bespoke build that cost £10k+, not a template and not a garage site.

How to get there:

* Generous spacing on a consistent scale, strong type hierarchy, few elements per screen.
* Fonts via `next/font/google`: Space Grotesk (headings) and Inter (body), defined once in the root layout.
* Thin 1px Gunmetal borders, subtle depth, Plum glow used sparingly, restrained texture. No heavy gradients, no gaming look, no clip-art.
* Contrast: body and small text are Off White or Silver on Carbon or Gunmetal only. Plum is for fills, borders and large accents, with Off White text on it. Light Plum only for large text (24px+ or 19px+ bold), icons and borders.

Motion (smooth, never flashy):

* CSS transitions for hover, focus and press states. `motion` for scroll reveals, modal and panel transitions, and page entrances.
* Reveals run once, move 12 to 24px, take 300 to 500ms, ease out. No parallax, no looping animation.
* Above-the-fold content must be visible in the server-rendered HTML. Never hide the hero until JavaScript loads.
* Respect `prefers-reduced-motion` everywhere.
* No autoplay video backgrounds.

---

# 5. Content rules

NEVER invent: BHP or torque figures, vehicle compatibility, reviews, certifications, guarantees, awards, customer results, partnerships, legal claims, opening hours, addresses, company details.

If information is missing, set the field to `null` (or an empty array), hide that section (components render nothing, no empty headings), and list it in your report as `[TODO: confirm]`. Never put "[TODO...]" or lorem ipsum in anything rendered.

Avoid these words unless the data contains them: guaranteed, best, number one, certified, authorised, approved, official.

---

# 6. Data rules

Types (put them in `types/`):

```ts
type Price = { amount: number; from?: boolean } | null; // null = price on request

type Service = {
  slug: string;
  name: string;
  category: "ecu-remapping" | "diagnostics";
  status: "active" | "draft";
  indexable: boolean;
  price: Price;
  priceOptions?: { label: string; amount: number }[];
  shortDescription: string | null;
  plainEnglish: string | null;      // for beginners
  technicalDetail: string | null;   // for enthusiasts, shown on demand
  includedItems: string[] | null;
  faqs: { question: string; answer: string }[];
  seoTitle: string | null;
  seoDescription: string | null;
  whatsappMessage: string | null;
};

type Offer = {
  id: string;
  slug: string;
  status: "active" | "draft";
  indexable: boolean;
  kind: "included" | "bundle" | "discount";
  title: string;
  tagline: string | null;
  description: string | null;
  serviceSlugs: string[];
  includes: string[];
  price: Price;                       // bundle price
  discount: { type: "amount" | "percent"; value: number } | null;
  startDate: string | null;           // ISO date
  endDate: string | null;             // ISO date
  showCountdown: boolean;
  featured: boolean;
  terms: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  whatsappMessage: string | null;
};
```

Services:

* Only `status: "active"` services are rendered, linked, offered in selectors or bundles, or returned by `generateStaticParams`. Draft means invisible everywhere.
* `indexable` is separate from `status`. A page is indexable only if it is active AND `indexable: true` AND both `seoTitle` and `seoDescription` are non-null. Otherwise it gets `robots: { index: false, follow: true }` and is left out of the sitemap.
* A `null` price shows "Price on request" and a WhatsApp button, never a number.
* Emissions-related services (EGR, DPF, AdBlue) must always be `indexable: false`.

Offers and bundles:

* Show an offer only if it is active AND live (today is on or after `startDate` and on or before `endDate`, where those exist). Expired offers hide automatically.
* If any service in `serviceSlugs` is not active, do not show the offer (fail closed).
* Countdowns appear only when `showCountdown` is true AND `endDate` is in the future. Never invent a deadline. No "limited spots", "only X left" or any other fake urgency.
* Savings ("save £X" or "worth £X") are computed only by `lib/offers` from the real fixed prices of the included services (no `from` prices, no null prices). If that isn't possible, show no saving. Never show strikethrough or "was" prices except that computed value.
* `kind: "included"` offers (extras included with a service) never show a monetary value.
* All price maths lives in `lib/offers` as small pure functions, never inside components.

Other data files:

* `data/locations.ts`: `{ slug, name }[]`. Plain list only for now. No area pages.
* `data/problems.ts`: `{ id, label, recommendedServiceSlug | null, whatsappMessage | null }[]` for the "What is happening with your car?" selector.
* `data/faqs.ts`: `{ id, question, answer, group }[]`.
* `data/reviews.ts`: `{ id, author, rating (1 to 5), text, source ("google" | "facebook" | "direct"), date | null, url | null }[]`. Real reviews only. Hide the section when empty. No aggregate rating and no review structured data.
* `data/trust.ts`: `{ id, label, logoSrc | null, alt | null, verified }[]`. Render only `verified: true` items. `verified` means the claim is true AND permission to use any logo is confirmed. Never imply a partnership or endorsement.
* `data/home.ts`: homepage copy (hero, how it works, why Revved).
* `data/site.ts`: business name, base town, service-area summary, `homeTitle`, `homeDescription`.
* `data/about.ts`: `{ heading, body, personName | null, role | null, photo: { src, alt } | null } | null`. It describes the person who comes to the customer's door. Hide the section (and its nav link) when null. Real details only.

---

# 7. Public copy rules

* DynoDrive is "road-based performance testing" or "pre & post-remap DynoDrive testing". Never "rolling road". Never state BHP or torque figures.
* Never write anything about the legality or road-use status of emissions-related services.
* Never diagnose. The "What is happening with your car?" selector recommends a check, not a cause.
* No guarantees, awards or "authorised agent" style claims unless they are in the data.
* UI microcopy (button labels, empty states, form hints) is fine. Business claims are not.

---

# 8. WhatsApp

Number: +44 7999 200 655.

Click-to-chat links use `https://wa.me/447999200655?text=<url-encoded message>`. No `+`, spaces, brackets or leading zero. The number comes from `NEXT_PUBLIC_WHATSAPP_NUMBER`, defaulting to `447999200655`.

All link and message building lives in `lib/whatsapp/`. Never hard-code WhatsApp URLs in components.

A secondary Call link uses the same number through `getPhoneUrl()` in `lib/whatsapp/` (a `tel:` link) and fires `phone_click`.

Default messages:

* General: "Hi Revved, I'd like a quote. My registration is ______."
* Service: use `service.whatsappMessage`, or "Hi Revved, I'd like a quote for <service name>. My registration is ______."
* With a reg entered: replace the blank with the normalised reg.

---

# 9. Vehicle lookup (lean version)

A plate-style registration field that opens WhatsApp with the reg pre-filled. It does not look anything up and shows no vehicle data or performance figures. Revved checks the car manually and replies on WhatsApp.

* `lib/vehicle/` contains `normaliseReg` (uppercase, strip spaces) and a lenient `isPlausibleReg` (2 to 8 letters and digits). Never reject an unusual but real plate.
* Input font size is at least 16px so iOS Safari does not zoom.
* Keep the component isolated so a real lookup provider can replace it later.

---

# 10. Analytics and consent

Components never call GA4 or Meta directly. They call `trackEvent()` from `lib/analytics/`.

Event names: `page_view`, `offer_view`, `offer_click`, `service_view`, `service_details_open`, `vehicle_lookup_start`, `vehicle_lookup_success`, `vehicle_lookup_failure`, `performance_result_view`, `whatsapp_click`, `phone_click`, `quote_start`, `faq_open`, `review_click`, `location_view`.

Until the tracking prompt is run, `trackEvent` does nothing (it may `console.debug` in development). Do not install analytics packages or load third-party scripts before that.

When tracking is added: no analytics or advertising script, cookie or storage before consent. Reject must be as easy as accept. Load scripts with `next/script`.

---

# 11. SEO and metadata

* Every page: unique title, unique meta description, canonical URL, Open Graph tags, one H1, a logical heading order. Set `metadataBase` from `NEXT_PUBLIC_SITE_URL`.
* The home page title and description come from `data/site.ts` (`homeTitle`, `homeDescription`) and name the service and area in plain words. Use `title: { absolute: homeTitle }` so the template is not added twice. Other pages use their own `seoTitle` and `seoDescription`. Do not add a meta keywords tag; search engines ignore it.
* Indexing follows section 6. `sitemap.ts` lists only indexable pages. `robots.ts` allows crawling and points to the sitemap.
* `/privacy` and `/cookies` are noindex until real content is added.
* JSON-LD: `AutomotiveBusiness` on the home page (name, url, telephone, areaServed) and `Service` on service pages. Include only facts that exist in the data. No `aggregateRating` and no review markup.
* No thin pages, no keyword stuffing, and never index vehicle lookup results.

---

# 12. Images and alt text

* Use `next/image` through one shared `Img` component in `components/ui` whose `alt` prop is required. Decorative images set `decorative` and render `alt=""`.
* Images live in `public/images/`, logos in `public/logo/`. Reference them from data or one place, never by scattering paths through components.
* Provide `width`/`height` (or `fill` with `sizes`) so there is no layout shift. Only the hero LCP image gets `priority`.
* Placeholders are clearly labelled neutral boxes. No stock photos of other people's work.

---

# 13. Responsive, accessibility, performance

* Design mobile first, then tablet, then laptop. Check 390px, 768px, 1024px and 1440px. Tablet layouts must be deliberate, not stretched mobile.
* Touch targets at least 44px. No horizontal scroll. Respect iOS safe areas (`env(safe-area-inset-bottom)`) for fixed bars.
* Semantic HTML, visible focus states, labelled inputs, keyboard-usable modals and menus, sufficient contrast, reduced-motion support.
* Targets on mobile: Lighthouse performance 90+, accessibility 95+, SEO 95+, CLS near 0. Report the real numbers if you can measure them.
* Fonts use `display: swap` through `next/font`. Third-party scripts load after interaction and only after consent.

---

# 14. Security, env, client components

* Never expose secrets in client code. Only `NEXT_PUBLIC_*` variables may be used client-side, and only when safe to expose.
* Use `.env.local` (never committed) and keep `.env.example` current.
* Prefer Server Components. Use `"use client"` only for browser APIs, event handlers, client state or interactive UI. Never make the whole app a client component.
* Validate and sanitise all user input (for example the reg field) before using it in a URL.

---

# 15. Code quality, done, and workflow

* Strict TypeScript, small reusable components, no duplicated logic, no premature abstractions.
* Do not modify unrelated files. One prompt is one focused change set.
* Before saying a task is done: `npm run lint` and `npm run build` pass, there are no TypeScript errors, and existing functionality still works.
* Verification honesty: if you cannot open a browser or view rendered pages, say so and list what I must check on mobile, tablet and laptop. Do not claim layouts were checked. If you cannot access current Next.js docs, say so instead of assuming.
* Your final report always lists: files created or changed, dependencies added, assumptions, `[TODO: confirm]` items, and what you could not verify.

---

# 16. Simplicity and conversion

The site should feel as simple as a one-page site, even though it has a few routes.

* One primary action on every screen: message Revved on WhatsApp (a button or the reg box). One secondary action: call.
* On mobile, the first screen must show what Revved does, where, the starting price, the main offer and the primary action. Nobody should scroll to find out what this is.
* A visitor with no car knowledge must understand what Revved does and what to do next within five seconds. Plain English first. Every jargon term (ECU, remap, Stage 1, Stage 2, DSG, DPF, OBD, bench) gets a one-line plain-English explanation the first time it appears on a page.
* Prices are visible on service cards and service pages without clicking. A null price shows "Price on request".
* Header navigation has at most five items: Services, Offers, How it works, About (only if about data exists) and the WhatsApp button. On other pages, in-page links point to `/#how-it-works` and `/#about`.
* Trust appears early and is real: the verification offer, the named person who comes to the customer's door, verified credentials, and real reviews once they exist. Never fill a trust slot with invented content.
* Short sections, short sentences, no walls of text. Each section has one job and a clear next step.
* Every page ends with the WhatsApp call to action.
