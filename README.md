# EasyStore

An e-commerce storefront built with Next.js: browse products by collection, open product pages, and keep a cart that survives page reloads.

**[Live demo](https://easystore-ui.vercel.app)**

## Features

- **Shop and collections:** a full catalogue plus per-category collection pages (`/collections/[category]`)
- **Product pages:** details, pricing, ratings, review counts and stock status on `/product/[id]`
- **Persistent cart:** add, remove and change quantities, with item count and subtotal; state lives in a Zustand store persisted to local storage
- **Account:** a sign-in page backed by a persisted auth store
- **Products API:** a Next.js route handler at `/api/products` serving the catalogue as JSON
- **Motion:** page and card animations with Framer Motion, and toast notifications for cart actions

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Zustand · Framer Motion · Lucide icons · react-hot-toast

## Project structure

```
src/
  app/          routes: shop, collections, product, cart, login, about, contact, api/products
  components/   header, footer and home sections (hero, product cards, listings)
  lib/          product data and the mapping into the Product type
  store/        Zustand stores for cart and auth
old_app/        the original React + Vite version, kept for reference
```

## Running locally

```bash
npm install
npm run dev
```

Then open [localhost:3000](http://localhost:3000).

Product data is sample data in the [DummyJSON](https://dummyjson.com) format, stored locally in `src/lib/data.json`.
