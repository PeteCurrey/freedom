"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
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

export function CartClient() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCart = () => {
      try {
        const stored = localStorage.getItem("amplios-cart");
        if (stored) {
          const parsed = JSON.parse(stored);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        console.error("Cart parse error:", err);
        setCartItems([]);
      }
    };

    updateCart();
    window.addEventListener("cart-updated", updateCart);

    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (e) {
        console.error("Auth check failed:", e);
      }
    };
    checkUser();

    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cartItems,
          userId: user?.id || 'guest'
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.url) window.location.href = data.url;
    } catch (err: any) {
      alert("Checkout Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const syncCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("amplios-cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems
      .map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
      .filter(item => item.quantity > 0);
    syncCart(updated);
  };

  const removeItem = (id: string) => {
    syncCart(cartItems.filter(item => item.id !== id));
  };

  const applyPromo = () => {
    setPromoError("");
    if (promoCode.toUpperCase() === "AMPLIOS10") {
      setPromoApplied(true);
    } else {
      setPromoError("Invalid or expired promo code.");
    }
  };

  const subtotal = Array.isArray(cartItems) 
    ? cartItems.reduce((acc, item) => acc + ((item.price || 0) * (item.quantity || 0)), 0)
    : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const vat = Math.round((subtotal - discount) * 0.2);
  const total = subtotal - discount + vat;

  if (!mounted) {
    return (
      <div className="pt-48 pb-32 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-[#111111] pb-32">
      <div className="w-full h-[2px] bg-brand-orange" />

      <section className="pt-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-4 font-mono text-[10px] text-brand-orange uppercase mb-6 tracking-[0.3em]">
               <div className="w-2 h-2 bg-brand-orange animate-pulse" /> Registry Buffer // {cartItems.length} Nodes Identified
            </div>
            <h1 className="font-display text-5xl lg:text-7xl uppercase leading-[0.9] tracking-tighter">
              YOUR <br />
              <span className="text-brand-orange">BASKET</span>
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-32 text-center bg-[#F8F8F6] border border-[#E5E5E5] max-w-4xl mx-auto rounded-xl">
              <ShoppingBag className="w-20 h-20 text-brand-grey mx-auto mb-8 opacity-40" />
              <h2 className="font-display text-3xl uppercase mb-4 text-[#111111]">Your cart is empty</h2>
              <p className="font-sans text-[#666666] text-lg mb-10 max-w-md mx-auto">
                Initialize your system by adding hardware components from the store.
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-4 bg-brand-orange px-10 py-4 font-display text-xs uppercase tracking-[0.2em] text-white hover:bg-[#E05A00] transition-all shadow-md rounded-sm font-bold"
              >
                Browse the Store <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between font-mono text-[9px] text-[#999999] uppercase tracking-widest border-b border-[#E5E5E5] pb-4 mb-4">
                   <span>Component Description</span>
                   <div className="hidden md:flex gap-12 pr-16">
                      <span>Quantity</span>
                      <span>Node Total</span>
                   </div>
                </div>

                {cartItems.map((item) => (
                  <div key={item.id} className="group relative bg-white border border-[#E5E5E5] p-6 flex flex-col md:flex-row gap-6 items-center transition-all hover:shadow-md rounded-sm">
                    <div className="w-24 h-24 bg-[#F8F8F6] border border-[#E5E5E5] flex items-center justify-center shrink-0 overflow-hidden relative p-4 rounded-sm">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      ) : (
                        <ShoppingBag className="w-8 h-8 text-[#999999]/50" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-[8px] text-brand-orange uppercase tracking-widest">{item.brand}</span>
                      </div>
                      <h3 className="font-display text-lg uppercase truncate group-hover:text-brand-orange transition-colors mb-1 text-[#111111]">
                        <Link href={`/store/product/${item.slug}`}>{item.name}</Link>
                      </h3>
                      <p className="font-mono text-[10px] text-[#666666] uppercase italic">
                         Unit Price: £{(item.price / 100).toLocaleString()} <span className="text-[8px] opacity-60 font-sans not-italic ml-1">inc. VAT</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-8 md:gap-12 shrink-0 w-full md:w-auto justify-between md:justify-end">
                       <div className="flex items-center border border-[#E5E5E5] h-10 rounded-sm">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-full flex items-center justify-center hover:bg-[#F8F8F6] text-[#666666] transition-all"><Minus size={12} /></button>
                          <div className="w-10 h-full flex items-center justify-center font-display text-sm border-x border-[#E5E5E5] text-[#111111]">{item.quantity}</div>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-full flex items-center justify-center hover:bg-[#F8F8F6] text-[#666666] transition-all"><Plus size={12} /></button>
                       </div>
                       <div className="w-24 text-right">
                          <span className="font-display text-xl text-[#111111] font-bold">£{((item.price * item.quantity) / 100).toLocaleString()}</span>
                       </div>
                       <button onClick={() => removeItem(item.id)} className="text-[#999999] hover:text-brand-orange transition-colors p-2"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}

                <div className="pt-8">
                  <Link href="/store" className="group inline-flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#666666] hover:text-brand-orange transition-all">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-2 transition-transform" /> Continue Shopping
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="bg-[#F8F8F6] border border-[#E5E5E5] p-8 sticky top-32 rounded-xl">
                  <div className="flex items-center gap-4 mb-8">
                     <ShieldCheck className="w-5 h-5 text-brand-orange" />
                     <h3 className="font-display text-xl uppercase tracking-tighter text-[#111111]">Order Summary</h3>
                  </div>

                  <div className="space-y-4 font-sans text-sm mb-8 border-b border-[#E5E5E5] pb-8">
                    <div className="flex justify-between text-[#666666]"><span>Items Subtotal</span><span>£{(subtotal / 100).toLocaleString()}</span></div>
                    {promoApplied && <div className="flex justify-between text-brand-orange"><span>Trade Discount (10%)</span><span>-£{(discount / 100).toLocaleString()}</span></div>}
                    <div className="flex justify-between text-[#666666]"><span>Estimated VAT (20%)</span><span>£{(vat / 100).toLocaleString()}</span></div>
                    <div className="flex justify-between text-[#666666]"><span>Delivery</span><span>{subtotal > 15000 ? "Free UK Delivery" : "Calculated at checkout"}</span></div>
                  </div>

                  <div className="flex justify-between items-end mb-8">
                    <span className="font-display text-lg uppercase tracking-tight text-[#111111]">Total Payload</span>
                    <div className="text-right">
                       <span className="font-display text-4xl text-[#111111] font-bold">£{(total / 100).toLocaleString()}</span>
                       <span className="block font-mono text-[8px] text-[#999999] uppercase tracking-widest mt-1">inc. VAT</span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="flex gap-2">
                      <input type="text" placeholder="Trade Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1 bg-white border border-[#E5E5E5] px-4 py-3 text-sm focus:outline-none focus:border-brand-orange transition-colors font-mono uppercase text-[#111111]" />
                      <button onClick={applyPromo} className="bg-[#E5E5E5] text-[#111111] px-4 py-3 font-display text-[10px] uppercase tracking-widest hover:bg-[#D5D5D5] transition-all font-bold">Apply</button>
                    </div>
                    {promoError && <p className="text-red-500 text-xs mt-2">{promoError}</p>}
                    {promoApplied && <p className="text-brand-orange text-xs mt-2 font-mono uppercase">Trade pricing active</p>}
                  </div>

                  <button onClick={handleCheckout} disabled={loading} className="w-full bg-brand-orange text-white py-5 font-display text-xs uppercase tracking-[0.2em] hover:bg-[#E05A00] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md font-bold rounded-sm">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Proceed to Checkout"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
