import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      productId: 1,
      productName: "Kawaii Cat Sticker",
      description: "Adorable pastel pink kawaii cat face — perfect for laptops, water bottles, and journals. Waterproof & fade-resistant.",
      price: 5.99,
      imageUrl: "/stickers/kawaii-cat.png",
      category: "Cute & Kawaii",
      inStock: true,
      rating: 4.8,
      reviewCount: 124,
    },
    {
      productId: 2,
      productName: "Galaxy Planet Sticker",
      description: "An out-of-this-world Saturn-ringed planet swirling with cosmic purples and blues. Great for space lovers.",
      price: 6.49,
      imageUrl: "/stickers/galaxy-planet.png",
      category: "Space & Galaxy",
      inStock: true,
      rating: 4.9,
      reviewCount: 87,
    },
    {
      productId: 3,
      productName: "Smiley Avocado Sticker",
      description: "This cheerful avocado is ready to brighten up anything it sticks to. Because everything's better with avocado.",
      price: 4.99,
      imageUrl: "/stickers/avocado.png",
      category: "Food & Cute",
      inStock: true,
      rating: 4.7,
      reviewCount: 203,
    },
    {
      productId: 4,
      productName: "Fire Flame Sticker",
      description: "Stay lit! This bold fire flame sticker with attitude is perfect for phone cases, skateboards, and helmets.",
      price: 5.49,
      imageUrl: "/stickers/fire-flame.png",
      category: "Cool & Bold",
      inStock: true,
      rating: 4.6,
      reviewCount: 59,
    },
    {
      productId: 5,
      productName: "Rainbow Cloud Sticker",
      description: "Spread good vibes with this pastel rainbow cloud sticker. Cute, colorful, and a little bit magical.",
      price: 5.99,
      imageUrl: "/stickers/rainbow-cloud.png",
      category: "Nature & Cute",
      inStock: false,
      rating: 4.5,
      reviewCount: 41,
    }
  ];

  // Simulate network delay for realism
  await new Promise(resolve => setTimeout(resolve, 300));

  return NextResponse.json(products);
}
