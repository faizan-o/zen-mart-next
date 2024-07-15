import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = "http://www.zenmart.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/*"],
      disallow: ["/admin/*", "/settings/", "/cart", "/orders", "/checkout"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
