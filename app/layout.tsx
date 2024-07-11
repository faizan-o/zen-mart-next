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
  title: "Authentication Plugin",
  description: "A Full Best Next Authentication System",
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
