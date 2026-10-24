export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

/** The slim shape sent to client components (cards, search, cart). */
export interface ProductSummary {
  id: number;
  title: string;
  brand: string | null;
  category: string;
  price: number;
  compareAt: number | null;
  discount: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  hoverImage: string | null;
}

export interface Category {
  slug: string;
  label: string;
  blurb: string;
  tile: string;
  count: number;
  cover: string;
}
