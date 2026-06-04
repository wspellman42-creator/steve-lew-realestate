import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "List, Buy or Build in central Indiana! - Steve Lew Real Estate Group",
  description:
    "Explore exceptional homes for sale in central Indiana with our expert realtors, dedicated to finding the perfect property for you.",
  keywords:
    "Steve Lew Real Estate, central Indiana homes, Indianapolis real estate, Greenwood homes for sale, MIBOR, buy sell home Indiana",
  openGraph: {
    title: "Steve Lew Real Estate Group",
    description:
      "Explore exceptional homes for sale in central Indiana with our expert realtors.",
    url: "https://www.listwithlew.com",
    siteName: "Steve Lew Real Estate Group",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
