import type { MetadataRoute } from "next";
import { getCategories, getProducts } from "@/lib/catalog";

const BASE = "https://easystore-ui.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["", "/shop", "/collections", "/about", "/contact"].map((path) => ({ url: `${BASE}${path}` })),
    ...getCategories().map((c) => ({ url: `${BASE}/collections/${c.slug}` })),
    ...getProducts().map((p) => ({ url: `${BASE}/product/${p.id}` })),
  ];
}
