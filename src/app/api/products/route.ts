import { NextResponse, type NextRequest } from "next/server";
import { getSummaries } from "@/lib/catalog";

export function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();
  const category = request.nextUrl.searchParams.get("category");

  let products = getSummaries();
  if (category) products = products.filter((p) => p.category === category);
  if (q) products = products.filter((p) => `${p.title} ${p.brand ?? ""} ${p.category}`.toLowerCase().includes(q));

  return NextResponse.json(products);
}
