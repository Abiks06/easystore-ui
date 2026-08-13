export async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", { cache: "no-store" });
    if (!res.ok) {
      console.error("Failed to fetch products from FakeStore API");
      return [];
    }
    
    const data = await res.json();
    
    // Map FakeStore API data to our Product interface
    return data.map((item: any) => ({
      productId: item.id,
      productName: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.image,
      category: item.category,
      inStock: true, // FakeStoreAPI doesn't have stock data, assuming true
      rating: item.rating?.rate || 0,
      reviewCount: item.rating?.count || 0,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
