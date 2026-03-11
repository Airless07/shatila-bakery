import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Shatila Bakery — Authentic Lebanese Sweets | Dearborn, MI",
  description:
    "Shatila Bakery on Ford Road in Dearborn, Michigan. Authentic Middle Eastern and Lebanese pastries, baklava, cakes, and sweets made fresh daily.",
  keywords: "Lebanese bakery, Middle Eastern sweets, baklava, Dearborn Michigan, Shatila",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-cream antialiased`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
