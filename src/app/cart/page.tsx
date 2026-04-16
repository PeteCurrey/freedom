"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number; // in pence
  quantity: number;
  image?: string;
  slug: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("diym_cart");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !user) return;
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cartItems,
          userId: user.id
        })
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);
      if (url) window.location.href = url;
    } catch (err: any) {
      alert("Checkout Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("diym_cart", JSON.stringify(items));
    // Dispatch event so nav badge updates
    window.dispatchEvent(new Event("cart-updated"));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id: string) => {
    updateCart(cartItems.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    setPromoError("");
    if (promoCode.toUpperCase() === "DIYM10") {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid or expired promo code.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const vat = Math.round((subtotal - discount) * 0.2);
  const total = subtotal - discount + vat;

  if (!mounted) return null;

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      <section className="pt-48 pb-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em] mb-4">// Your Build Cart</p>
            <h1 className="font-display text-6xl uppercase">
              YOUR <span className="text-brand-orange">CART</span>
            </h1>
          </div>

          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="py-32 text-center blueprint-border bg-brand-carbon max-w-2xl mx-auto">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              <ShoppingBag className="w-16 h-16 text-brand-grey mx-auto mb-8 opacity-30" />
              <h2 className="font-display text-3xl uppercase mb-4">Your Cart is Empty</h2>
              <p className="font-sans text-brand-grey mb-12">
                You haven&apos;t added any components yet. Browse the store to find the right gear for your build.
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 font-display text-xs uppercase tracking-widest text-white hover:bg-white hover:text-brand-orange transition-all"
              >
                Browse the Store <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Line Items */}
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="blueprint-border bg-brand-carbon p-6 flex gap-6 items-center">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-brand-obsidian blueprint-border flex items-center justify-center shrink-0 overflow-hidden relative">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-brand-grey/30" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[8px] text-brand-orange uppercase tracking-widest mb-1">{item.brand}</p>
                      <h3 className="font-display text-lg uppercase truncate">{item.name}</h3>
                      <p className="font-mono text-[10px] text-brand-grey uppercase mt-1">
                        £{(item.price / 100).toLocaleString()} each
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-orange transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 border border-brand-border flex items-center justify-center hover:border-brand-orange transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="shrink-0 w-24 text-right">
                      <span className="font-display text-xl">£{((item.price * item.quantity) / 100).toLocaleString()}</span>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-brand-grey hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="pt-4">
                  <Link
                    href="/store"
                    className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-grey hover:text-brand-white transition-colors"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4">
                <div className="blueprint-border bg-brand-carbon p-8 sticky top-32 space-y-8">
                  <h2 className="font-display text-xl uppercase">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="space-y-3">
                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                        placeholder="DIYM10"
                        className="flex-1 bg-brand-obsidian border border-brand-border p-3 font-mono text-xs text-brand-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 bg-brand-obsidian border border-brand-border font-mono text-[9px] uppercase hover:border-brand-orange transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="font-mono text-[9px] text-green-500 uppercase">✓ 10% discount applied</p>
                    )}
                    {promoError && (
                      <p className="font-mono text-[9px] text-red-500 uppercase">{promoError}</p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-4 pt-4 border-t border-brand-border/30">
                    <div className="flex justify-between font-mono text-[10px] uppercase">
                      <span className="text-brand-grey">Subtotal</span>
                      <span>£{(subtotal / 100).toLocaleString()}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between font-mono text-[10px] uppercase text-green-500">
                        <span>Discount (10%)</span>
                        <span>-£{(discount / 100).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[10px] uppercase text-brand-grey">
                      <span>VAT (20%)</span>
                      <span>£{(vat / 100).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-display text-2xl pt-4 border-t border-brand-border/30">
                      <span>Total</span>
                      <span className="text-brand-orange">£{(total / 100).toLocaleString()}</span>
                    </div>
                  </div>

                  {user ? (
                    <button 
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full py-5 bg-brand-orange text-white font-display text-xs uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>Proceed to Checkout <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  ) : (
                    <Link 
                      href="/account/login?redirect=/cart"
                      className="w-full py-5 border border-brand-orange text-brand-orange font-display text-xs uppercase tracking-widest hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-3"
                    >
                      Login to Checkout <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}

                  <div className="pt-6 border-t border-brand-border/30 space-y-4">
                     <div className="flex items-center gap-3 grayscale opacity-60">
                        <div className="w-8 h-8 blueprint-border flex items-center justify-center">
                           <ShieldCheck className="w-4 h-4 text-brand-orange" />
                        </div>
                        <p className="font-mono text-[8px] text-brand-grey uppercase tracking-tighter italic">Secured by Stripe SSL Encryption</p>
                     </div>
                     <div className="flex items-center gap-3 grayscale opacity-60">
                        <div className="w-8 h-8 blueprint-border flex items-center justify-center">
                           <Tag className="w-4 h-4 text-brand-orange" />
                        </div>
                        <p className="font-mono text-[8px] text-brand-grey uppercase tracking-tighter italic">Verified Component Engineering</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
