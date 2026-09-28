# Revved Performance

Revved Performance is a mobile automotive services business based in Romford, covering East London and Essex.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Folder Structure

- `app/` - Next.js App Router entry points (pages, layouts, metadata)
- `components/` - React components divided by domain (`ui`, `layout`, `services`, `offers`, etc.)
- `data/` - Business data and content (services, offers, locations, problems, FAQs, etc.)
- `lib/` - Helpers and logic (WhatsApp generation, analytics tracking, offer calculation, SEO rules)
- `types/` - TypeScript models for the business data
- `public/` - Static assets (`images/`, `logo/`)
- `docs/` - Project documentation and checklists

## Managing Content

**How to add a service or an offer:**

You DO NOT need to write any new code or React components. 

To add a new service:
1. Open `data/services.ts`
2. Add a new `Service` object to the array following the existing schema.
3. If it should be live, set `status: "active"`.
4. If it should be indexable by search engines, ensure `indexable: true` and that `seoTitle` and `seoDescription` are provided.

To add a new offer:
1. Open `data/offers.ts`
2. Add a new `Offer` object.
3. Provide the required fields, including the `serviceSlugs` it applies to.
4. Set the `startDate` and `endDate` if applicable.

The routing and components will automatically pick up the new active items and render their respective pages.
