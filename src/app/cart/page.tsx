import { Metadata } from "next";
import { CartClient } from "@/components/store/CartClient";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Your Basket | Amplios Store",
  description: "Review your build components and proceed to secure checkout.",
};

export default function CartPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <CartClient />
      <Footer />
    </main>
  );
}
