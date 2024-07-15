import ProductsSection from "@/components/products-section";
import { getProductById, getProductsByCategoryId } from "@/data/products";
import React from "react";
import ProductDetailsSection from "@/components/product-details-section";
import { Metadata } from "next";

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

export const generateMetadata = async ({
  params,
}: ProductDetailPageProps): Promise<Metadata> => {
  const product = await getProductById(params.productId);
  return {
    title: product?.name,
    description: product?.description,
    keywords: product?.name.split(" "),
    openGraph: {
      title: product?.name || "",
      description: product?.description || "",
      url: `https://zen-mart.vercel.app/product/${params.productId}`,
      images: [product?.image || ""],
      type: "article",
      siteName: "ZenMart",
    },
  };
};

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
