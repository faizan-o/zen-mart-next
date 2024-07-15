import { SessionProvider } from "next-auth/react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { auth } from "@/auth";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "ZenMart | The Best Ecommerce Site",
    template: "ZenMart | %s | The Best Ecommerce Site",
  },
  description:
    "Welcome to ZenMart, your one-stop online shopping destination for quality products at affordable prices. At ZenMart, we are committed to delivering an exceptional shopping experience with a wide range of products from top brands. Our mission is to provide our customers with unparalleled value, fast shipping, and outstanding customer service. Whether you're looking for the latest electronics, fashionable apparel, or everyday essentials, ZenMart has you covered. We prioritize your security with safe and secure checkout processes, ensuring a worry-free shopping experience. Our easy returns policy and dedicated customer support team are here to make your shopping seamless and enjoyable. Join our community of satisfied customers and discover the ZenMart difference. Shop with confidence, knowing you are getting the best deals and top-quality products. Experience convenience, reliability, and excellence with ZenMart, where shopping meets satisfaction. Explore our site and start your journey with ZenMart today",
  icons: ["/favicon.ico"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={cn("vsc-initialized dark", poppins.className)}>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          {children}
          <Toaster theme="dark" />
        </body>
      </SessionProvider>
    </html>
  );
}
