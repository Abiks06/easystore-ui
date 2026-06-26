import PageHeading from "./PageHeading";
import ProductListing from "./ProductListing";
import products from "../Data/products";

function Home() {
  return (
    <>
      <PageHeading title="Abiks' Store">
        Our sticker store offers a curated collection of high-quality, creative
        designs that bring personality and flair to everyday items. From trendy
        aesthetics to custom creations, we focus on delivering durable, vibrant
        stickers that help customers express themselves, decorate their spaces,
        and add a unique touch to their belongings.
      </PageHeading>
      <ProductListing products={products} />
    </>
  );
}

export default Home;
