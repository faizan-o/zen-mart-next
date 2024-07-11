import ProductsSection from "@/components/products-section";
import { getProductById, getProductsByCategoryId } from "@/data/products";
import React from "react";
import ProductDetailsSection from "@/components/product-details-section";

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const product = await getProductById(params.productId);
  const relatedProducts = product
    ? await getProductsByCategoryId(product.categoryId, undefined)
    : null;
  

  return (
    <section>
      {product ? (
        <ProductDetailsSection productToShowDetails={product} />
      ) : null}
      {relatedProducts && product ? (
        <ProductsSection
          heading="Related Products"
          products={relatedProducts.filter((p) => p.id !== product.id)}
        />
      ) : null}
    </section>
  );
};

export default ProductDetailPage;
