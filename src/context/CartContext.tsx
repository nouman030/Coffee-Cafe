"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  notes?: string;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  savings: number;
  checkoutSuccess: boolean;
  triggerCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Initialize with a default welcome item so the drawer is never empty on first peek
  useEffect(() => {
    setItems([
      {
        id: "combo-morning",
        name: "The Morning Ritual Combo",
        price: 14,
        originalPrice: 18,
        category: "Signature Combo",
        notes: "Single Origin Flat White + Almond Croissant + Cupping Card",
        quantity: 1,
      },
    ]);
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQ = i.quantity + delta;
            return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setItems([]);

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const triggerCheckout = () => {
    setCheckoutSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff5b14", "#efe8dc", "#ffd8b6"],
      });
    } catch {
      // fallback
    }
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsOpen(false);
    }, 2800);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        savings,
        checkoutSuccess,
        triggerCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
