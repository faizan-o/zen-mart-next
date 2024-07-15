import ContactCard from "@/components/contact-card";
import { AboutImage3 } from "@/public/export";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Us Using Our Email Or Phone Numbers Or The Social Media Link That We Provided",
  openGraph: {
    title: "Contact Us",
    description:
      "Contact Us Using Our Email Or Phone Numbers Or The Social Media Link That We Provided",
    url: new URL(`${process.env.BASE_URL}/contact`),
    type: "website",
    siteName: "ZenMart",
    images: [`${process.env.BASE_URL}/AboutImage3.webp`],
  },
};

const ContactPage = () => {
  return (
    <div className="min-h-full min-w-full flex justify-center items-center py-20">
      <ContactCard />
    </div>
  );
};

export default ContactPage;
