"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Tag, ChevronRight, ShieldCheck, Loader2 } from "lucide-react";
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
          {/* Editorial Header */}
          <div className="mb-20">
            <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-6 tracking-[0.3em]">
               <div className="w-2 h-2 bg-brand-orange animate-pulse" /> Registry Buffer // {cartItems.length} Nodes
            </div>
            <h1 className="font-display text-7xl lg:text-9xl uppercase leading-[0.8] tracking-tighter">
              BUILDING <br />
              <span className="text-brand-orange">REGISTRY</span>
            </h1>
          </div>

          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="py-48 text-center bg-brand-carbon blueprint-border relative overflow-hidden max-w-4xl mx-auto">
              <div className="blueprint-grid absolute inset-0 opacity-10 pointer-events-none" />
              <ShoppingBag className="w-20 h-20 text-brand-grey mx-auto mb-8 opacity-20" />
              <h2 className="font-display text-4xl uppercase mb-6">Buffer Empty</h2>
              <p className="font-sans text-brand-grey text-lg mb-12 max-w-md mx-auto">
                Your build registry is currently empty. Initialize your system by adding hardware components from the store.
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-4 bg-brand-orange px-12 py-5 font-display text-xs uppercase tracking-[0.2em] text-white hover:bg-white hover:text-brand-obsidian transition-all shadow-[0_0_40px_rgba(255,107,0,0.2)]"
              >
                Enter Store <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Registry Line Items */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between font-mono text-[10px] text-brand-grey uppercase tracking-widest border-b border-brand-border pb-4 mb-4">
                   <span>Component Description</span>
                   <div className="flex gap-12 pr-16">
                      <span>Quantity</span>
                      <span>Node Total</span>
                   </div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="group relative bg-brand-carbon blueprint-border p-8 flex flex-col md:flex-row gap-8 items-center transition-all hover:bg-brand-graphite">
                    {/* Thumbnail Node */}
                    <div className="w-24 h-24 bg-brand-obsidian blueprint-border flex items-center justify-center shrink-0 overflow-hidden relative p-4">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-brand-grey/20" />
                      )}
                    </div>

                    {/* Meta Data */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest px-2 py-0.5 border border-brand-orange/30">{item.brand}</span>
                        <span className="font-mono text-[8px] text-brand-grey uppercase">ID: {item.id.substring(0, 8)}</span>
                      </div>
                      <h3 className="font-display text-xl uppercase truncate group-hover:text-brand-orange transition-colors mb-2">{item.name}</h3>
                      <p className="font-mono text-[10px] text-brand-grey uppercase italic">
                         Registry Rate: £{(item.price / 100).toLocaleString()} <span className="text-[8px] opacity-50">inc. VAT</span>
                      </p>
                    </div>

                    {/* Operational Controls */}
                    <div className="flex items-center gap-12 shrink-0">
                       <div className="flex items-center border border-brand-border h-12">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-full flex items-center justify-center hover:bg-brand-obsidian text-brand-grey hover:text-white transition-all"
                          >
                            <Minus size={12} />
                          </button>
                          <div className="w-12 h-full flex items-center justify-center font-display text-base border-x border-brand-border">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-full flex items-center justify-center hover:bg-brand-obsidian text-brand-grey hover:text-white transition-all"
                          >
                            <Plus size={12} />
                          </button>
                       </div>

                       <div className="w-28 text-right">
                          <span className="font-display text-2xl">£{((item.price * item.quantity) / 100).toLocaleString()}</span>
                       </div>

                       <button
                        onClick={() => removeItem(item.id)}
                        className="text-brand-grey hover:text-brand-orange transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Hover corner accents */}
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-orange/0 group-hover:border-brand-orange/100 transition-all" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-orange/0 group-hover:border-brand-orange/100 transition-all" />
                  </div>
                ))}

                <div className="pt-8">
                  <Link
                    href="/store"
                    className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-brand-grey hover:text-white transition-all"
                  >
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-2 transition-transform" /> Re-enter Catalog Registry
                  </Link>
                </div>
              </div>

              {/* Commission Summary */}
              <div className="lg:col-span-4">
                <div className="bg-brand-carbon blueprint-border p-10 sticky top-32 space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                     <div className="w-10 h-10 bg-brand-orange/10 flex items-center justify-center">
                        <Tag className="text-brand-orange w-5 h-5" />
                     </div>
                     <h2 className="font-display text-2xl uppercase italic">COMMISSION</h2>
                  </div>

                  {/* Promo Input Node */}
                  <div className="space-y-4">
                    <label className="font-mono text-[9px] text-brand-grey uppercase tracking-widest block opacity-50">
                      Input Registry Token (Promo)
                    </label>
                    <div className="flex gap-px bg-brand-border">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                        placeholder="DIYM10"
                        className="flex-1 bg-brand-obsidian p-4 font-mono text-xs text-brand-white focus:outline-none placeholder:text-brand-grey/30"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-6 bg-brand-obsidian text-brand-orange hover:bg-brand-orange hover:text-white transition-all font-mono text-[10px] uppercase"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && <p className="font-mono text-[8px] text-green-500 uppercase tracking-widest animate-pulse">✓ Token accepted: 10% Reduction active</p>}
                    {promoError && <p className="font-mono text-[10px] text-red-500 uppercase">{promoError}</p>}
                  </div>

                  {/* Ledger Breakdown */}
                  <div className="space-y-5 pt-8 border-t border-brand-border">
                    <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest">
                      <span className="text-brand-grey italic">Subtotal ledger</span>
                      <span>£{(subtotal / 100).toLocaleString()}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-green-500">
                        <span className="italic">Token rebate</span>
                        <span>-£{(discount / 100).toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-brand-grey">
                      <span className="italic">Taxation (VAT 20%)</span>
                      <span>£{(vat / 100).toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-8 border-t-2 border-brand-orange/30">
                       <div className="flex justify-between items-baseline mb-2">
                          <span className="font-display text-4xl uppercase">Balance</span>
                          <span className="font-display text-5xl text-brand-orange">£{(total / 100).toLocaleString()}</span>
                       </div>
                       <div className="font-mono text-[10px] text-brand-grey uppercase tracking-widest text-right">
                          Estimated Freight: Included
                       </div>
                    </div>
                  </div>

                  {/* Operational Controls */}
                  <div className="space-y-4 pt-8">
                    {user ? (
                      <button 
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full py-6 bg-brand-orange text-white font-display text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-brand-obsidian transition-all flex items-center justify-center gap-4 disabled:opacity-50 relative group overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>Initialize Checkout Registry <ChevronRight className="w-4 h-4" /></>
                        )}
                      </button>
                    ) : (
                      <Link 
                        href="/account/login?redirect=/cart"
                        className="w-full py-6 border border-brand-orange text-brand-orange font-display text-xs uppercase tracking-[0.2em] hover:bg-brand-orange hover:text-white transition-all flex items-center justify-center gap-4"
                      >
                        Authorize Node to Checkout <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {/* Engineering Verification */}
                  <div className="pt-10 space-y-6">
                     <div className="flex items-start gap-4 p-4 bg-brand-obsidian/50 border-l border-brand-orange/30">
                        <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0" />
                        <p className="font-mono text-[9px] text-brand-grey uppercase leading-relaxed tracking-tighter">
                          All hardware nodes are verified for off-grid compliance and electrical safety standards.
                        </p>
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
