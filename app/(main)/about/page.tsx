import AboutCard from "@/components/about-card";
import { ABOUT_CARD_DATA } from "@/constants/about";
import { ABOUT_KEYWORDS } from "@/constants/seo/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.BASE_URL}/about`),
  keywords: ABOUT_KEYWORDS,
  title: "About Us",
  description:
    "Welcome to ZenMart, a world-class e-commerce website offering a wide range of products for all your needs.",
  openGraph: {
    title: "The Story Of ZenMart | The Best Ecommerce Store",
    description:
      "Know The Story Of ZenMart By Reading Our About Us Page | The Best Ecommerce Store",
    images: [`${process.env.BASE_URL}/AboutImage4.webp`],
    url: new URL(`${process.env.BASE_URL}/about`),
    type: "website",
    siteName: "ZenMart",
  },
};

const AboutPage = () => {
  return (
    <div className="px-5">
      <h1 className="font-bold text-3xl pl-5 pt-5">About Us</h1>
      <div className="space-y-20">
        {ABOUT_CARD_DATA.map((cardData, index) => (
          <AboutCard
            key={index}
            isEven={index % 2 === 0}
            heading={cardData.heading}
            paragraph={cardData.paragraph}
            imageSrc={cardData.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
