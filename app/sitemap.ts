import { MetadataRoute } from "next";
import { getAllProducts, getAllProductsCount } from "../data/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "https://www.zenmart.com/";
  const products = await getAllProducts({
    start: 0,
    end: (await getAllProductsCount()) || 0,
  });

  const productData: MetadataRoute.Sitemap = products
    ? products?.map((product) => ({
        url: `${baseURL}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.8,
      }))
    : [];

  return [
    {
      url: baseURL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
    ...productData,
  ];
}
