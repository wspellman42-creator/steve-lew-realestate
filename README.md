# Steve Lew Real Estate Group — Website

A full-featured real estate website for **Steve Lew Real Estate Group**, built with Next.js 16, Tailwind CSS v4, and designed to be a functional replica of [listwithlew.com](https://www.listwithlew.com/).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript |
| Database | Supabase (ready — pending setup) |
| Deployment | Vercel |
| Fonts | Cormorant Garamond (serif) + Inter (sans) via `next/font/google` |

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, featured listings, testimonials, blog |
| `/listing` | Buy — property search with filters, list/grid/map view |
| `/listing/[id]` | Listing Detail — photos, details, contact form |
| `/sell` | Sell — offerings, contact form, 6-step process |
| `/about` | Meet the Team — agent grid, testimonials, buyer/seller services |
| `/snapshot` | Market Snapshot — live market analytics (mock data, ready for IDX) |
| `/mortgage-calculator` | Mortgage Calculator — interactive payment + amortization schedule |
| `/home-valuation` | Home Valuation — 3-step address entry wizard |

## Features

- **Responsive design** — mobile, tablet, and desktop
- **Fixed navbar** with scroll-aware background, dropdowns, and mobile hamburger menu
- **Property search** with city/county/subdivision search, price, beds, baths, and property type filters
- **Property cards** — grid and list view with status badges and open house tags
- **Interactive mortgage calculator** — monthly payment, total cost, amortization schedule table
- **Home valuation wizard** — 3-step form flow
- **Market snapshot** — location-based market stats with trend chart
- **Testimonials carousel** — Google review cards with navigation
- **Team grid** — all 17 agents with photo and title
- **Blog section** — post cards linking to blog detail pages
- **Footer** — full sitemap, social links, MIBOR/REALTOR badges, IDX disclaimer

## Listings Integration (MIBOR IDX)

Currently showing **mock listing data** for UI preview. To wire up real MIBOR listings:

1. Obtain MIBOR IDX credentials (MLS membership required)
2. Choose an IDX provider: iHomeFinder, Showcase IDX, IDX Broker, or direct RETS/MRED API
3. Replace `lib/mockData.ts` listings with live IDX API calls in the `/listing` route
4. Update `next.config.ts` image domains to allow IDX image CDN hosts

## Supabase (Ready to Connect)

Create a Supabase project and run these migrations to enable form submissions:

```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text,
  form_source text,
  listing_address text,
  created_at timestamptz default now()
);
alter table contact_submissions enable row level security;
create policy "Anyone can insert" on contact_submissions for insert with check (true);
```

Then add to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push to GitHub (already done via `gh repo create`)
2. Import repo at vercel.com/new
3. Add environment variables in Vercel dashboard
4. Deploy — auto-deploys on every push to `main`

## Domain Setup

To point `listwithlew.com` to this Vercel deployment:
1. In Vercel project settings > Domains > add `listwithlew.com`
2. Update DNS at your registrar with the Vercel A/CNAME records
3. SSL is automatic via Vercel

## Contact Info

- **Phone:** +1(317) 868-5478
- **Email:** info@listwithlew.com
- **Address:** 550 US 31 S., Greenwood, Indiana, 46142, USA
- **License:** RC51800217

---

*Built with permission from Steve Lew Real Estate Group.*
