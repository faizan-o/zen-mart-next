import OnGoingCampaignsSection from "@/components/home/campaign-section";
import HeroSection from "@/components/home/hero";
import ProductsSection from "@/components/home/home-products-section";
import PromiseSection from "@/components/home/promise-section/promise-section";
import { logo } from "@/public/export";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover the world of ZenMart, a world-class e-commerce website.",
  keywords: ["e-commerce", "zenmart", "home", "products", "promise"],
  openGraph: {
    title: "ZenMart - The Best Ecommerce Shopping Website",
    description:
      "The Best E-commerce Shopping Website In The World With A Wide Varirty Of Products And At Very Cheap And Low Prices",
    images: [`${process.env.BASE_URL}/logo.png`],
    siteName: "ZenMart",
    url: new URL(process.env.BASE_URL || ""),
    type: "website",
  },
};

const Home = async () => {
  return (
    <main className="">
      <HeroSection />
      <OnGoingCampaignsSection />
      <ProductsSection />
      <PromiseSection />
    </main>
  );
};

export default Home;
