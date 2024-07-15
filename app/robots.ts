import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = process.env.BASE_URL || "";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/*"],
      disallow: ["/admin/*", "/settings/", "/cart", "/orders", "/checkout"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
