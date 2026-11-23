"use client";

import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, CheckCircle2 } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalCount,
    subtotal,
    savings,
    checkoutSuccess,
    triggerCheckout,
  } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Roastery Order"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#0f0e0c] border-l border-[#24201c] h-full shadow-2xl flex flex-col z-10 text-[#efe8dc]">
        {/* Header */}
        <div className="p-5 border-b border-[#24201c] flex items-center justify-between bg-[#161412]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#ff5b14]" />
            <h2 className="font-display text-xl font-bold tracking-wide">
              YOUR ROASTERY ORDER ({totalCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart drawer"
            className="p-2 rounded-full hover:bg-[#24201c] text-[#8c847a] hover:text-[#efe8dc] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Notice */}
        {checkoutSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#ff5b14]/20 border border-[#ff5b14] flex items-center justify-center text-[#ff5b14] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-display text-2xl font-black text-[#efe8dc]">ORDER DISPATCHED!</h3>
            <p className="text-sm text-[#8c847a] max-w-xs">
              Freshly roasted beans are queued for grinding and extraction. See you at the counter or watch your email for live dispatch tracking!
            </p>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#1e1b18]">
              {items.length === 0 ? (
                <div className="py-16 text-center text-[#8c847a]">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#ff5b14]" />
                  <p className="font-mono text-sm">Your order tray is currently empty.</p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-4 py-2 border border-[#ff5b14] text-[#ff5b14] text-xs font-mono uppercase tracking-wider hover:bg-[#ff5b14] hover:text-[#0b0a09] transition-all"
                  >
                    Explore Curated Roasts
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-[#ff5b14] uppercase">
                            {item.category}
                          </span>
                          <h4 className="font-display text-lg font-bold text-[#efe8dc] leading-tight">
                            {item.name}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-[#8c847a] hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.notes && (
                        <p className="text-xs text-[#8c847a] mt-1 line-clamp-1">{item.notes}</p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#2e2925] rounded bg-[#161412]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                            className="p-1.5 hover:bg-[#24201c] text-[#8c847a] hover:text-[#efe8dc] transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 font-mono text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                            className="p-1.5 hover:bg-[#24201c] text-[#8c847a] hover:text-[#efe8dc] transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="font-mono text-sm font-bold text-[#efe8dc]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="block font-mono text-[11px] text-[#8c847a] line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-[#24201c] bg-[#161412] space-y-3">
                {savings > 0 && (
                  <div className="flex items-center justify-between text-xs font-mono text-[#ff5b14] bg-[#ff5b14]/10 px-3 py-1.5 rounded border border-[#ff5b14]/20">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Combo Deal Savings:
                    </span>
                    <span className="font-bold">-${savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#8c847a]">Estimated Tax & Prep</span>
                  <span className="font-mono text-xs text-[#8c847a]">Calculated at Counter</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#24201c]">
                  <span className="font-display text-lg font-bold text-[#efe8dc]">TOTAL</span>
                  <span className="font-mono text-xl font-bold text-[#ff5b14]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={triggerCheckout}
                  className="w-full py-3.5 px-4 bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] font-display font-black tracking-widest text-lg uppercase transition-all shadow-[0_0_25px_rgba(255,91,20,0.35)] hover:shadow-[0_0_35px_rgba(255,91,20,0.55)] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  Confirm & Brew Order
                </button>
                <p className="text-[11px] text-center font-mono text-[#8c847a]">
                  ⚡ Priority Barista Queue · Fresh Extraction in &lt; 4 mins
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
