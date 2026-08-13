import productData from './data.json';

export async function getProducts() {
  try {
    // Map local JSON data to our Product interface
    return productData.map((item: any) => ({
      productId: item.id,
      productName: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.image,
      category: item.category,
      inStock: true, // Assuming true since it's not in the API
      rating: item.rating?.rate || 0,
      reviewCount: item.rating?.count || 0,
    }));
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}
