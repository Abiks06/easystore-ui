// Display metadata for each catalogue category. `tile` is the backdrop colour
// product cut-outs sit on, so every category reads as its own little world.
export const CATEGORY_META: Record<string, { label: string; blurb: string; tile: string }> = {
  beauty: { label: "Beauty", blurb: "Lashes, lips and the little rituals.", tile: "#F1D5CC" },
  fragrances: { label: "Fragrances", blurb: "Signature scents worth a second look.", tile: "#DDD3EA" },
  furniture: { label: "Furniture", blurb: "Pieces to build a room around.", tile: "#E7D8BF" },
  groceries: { label: "Groceries", blurb: "Fresh staples for the weekly shop.", tile: "#D3E5C8" },
  "home-decoration": { label: "Home Decor", blurb: "Small touches, big difference.", tile: "#F2D9BD" },
  "kitchen-accessories": { label: "Kitchen", blurb: "Tools that earn their drawer space.", tile: "#CFE0E8" },
  laptops: { label: "Laptops", blurb: "Serious machines for serious work.", tile: "#D7DAE0" },
  "mens-shirts": { label: "Men's Shirts", blurb: "Easy layers for every day.", tile: "#E2DFCC" },
  "mens-shoes": { label: "Men's Shoes", blurb: "From the court to the commute.", tile: "#EBD3C2" },
  "mens-watches": { label: "Watches", blurb: "Time, kept beautifully.", tile: "#D6D0C2" },
  "mobile-accessories": { label: "Mobile", blurb: "Keep your phone powered and protected.", tile: "#CCDAE6" },
};

export function categoryLabel(slug: string) {
  return CATEGORY_META[slug]?.label ?? slug.replace(/-/g, " ");
}

export function categoryTile(slug: string) {
  return CATEGORY_META[slug]?.tile ?? "#E4DFD4";
}
