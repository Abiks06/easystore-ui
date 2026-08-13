import productData from './data.json';

export async function getProducts() {
  try {
    // DummyJSON returns an object { products: [...] }
    const items = productData.products || [];
    // Map local JSON data to our Product interface
    return items.map((item: any) => ({
      productId: item.id,
      productName: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.thumbnail, // DummyJSON uses thumbnail for the main image
      category: item.category,
      inStock: item.stock > 0, // Compute inStock from stock quantity
      rating: item.rating || 0,
      reviewCount: item.reviews?.length || 0,
    }));
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}
