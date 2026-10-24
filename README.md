# EasyStore

A small, well-edited storefront built with Next.js: an editorial home page, a filterable shop, product pages with galleries and reviews, a slide-out bag and a three-step checkout with Mobile Money. Prices are in Ghana cedis.

**[Live demo](https://easystore-ui.vercel.app)**

## Features

- **Editorial home page:** animated hero collage, category bento, trending and markdown rails, a deal of the day with a live countdown, and a review wall
- **Shop and collections:** search, category, brand, price, rating and sale filters with live counts, six sort orders and two grid densities; all filter state lives in the URL so results can be shared
- **⌘K search:** a command palette over every product, collection and quick action (press `⌘K`, `Ctrl+K` or `/` anywhere)
- **Product pages:** image gallery with hover zoom (swipeable on mobile), stock levels, spec accordions, review breakdown, related products and a sticky buy bar on phones
- **Bag:** slide-out drawer with a free-delivery progress bar, quantity controls, undo on remove and save-for-later
- **Checkout:** contact, delivery or store pickup, then MTN MoMo / Telecel Cash / AirtelTigo Money or pay on delivery; inline validation for Ghana phone numbers, and an order confirmation page
- **Account without passwords:** orders, saved items and checkout details are remembered on the device
- **Dark mode:** follows the system setting, can be toggled, and never flashes on load
- **Static by default:** all 100 product pages and 11 collections are prerendered, with per-page metadata, JSON-LD and a sitemap

## Tech stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · Zustand · Framer Motion · cmdk · Sonner · Lucide icons

## Project structure

```
src/
  app/                 routes: home, shop, collections, product, cart, checkout, orders, account, about, contact, api/products
  components/
    layout/            header, footer, bag drawer, command palette, theme
    home/              home page sections
    product/           product card, gallery, purchase panel, rails, shared bits
    shop/              the filter and sort explorer
  lib/                 catalogue access, category metadata, formatting, types
  store/               Zustand stores: cart, wishlist, orders, UI
old_app/               the original React + Vite version, kept for reference
```

## Running locally

```bash
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

Product data is sample data in the [DummyJSON](https://dummyjson.com) format, stored locally in `src/lib/data.json`. Checkout is a demo: no payment is taken and orders are stored in the browser.
