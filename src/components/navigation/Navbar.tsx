"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, Flame } from "lucide-react";

export function Navbar() {
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Curated Roasts", href: "#roasts" },
    { label: "Special Combos", href: "#combos" },
    { label: "Tasting Guide", href: "#guide" },
    { label: "Artisan Craft", href: "#craft" },
    { label: "Hours & Visit", href: "#visit" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0a09]/90 backdrop-blur-md border-b border-[#24201c] py-3 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with animated steam cup */}
          <a href="#" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5b14] rounded">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-[#8c847a] hover:text-[#efe8dc] hover:scale-105 transition-all relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff5b14] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3.5">
            {/* Live Roaster Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161412] border border-[#24201c] text-[11px] font-mono text-[#8c847a]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5b14] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5b14]"></span>
              </span>
              <span className="text-[#efe8dc] font-bold">ROASTING NOW:</span>
              <span className="text-[#ff5b14]">BATCH #408</span>
            </div>

            {/* Cart / Order Button */}
            <button
              onClick={openCart}
              aria-label={`View your roastery order with ${totalCount} items`}
              className="relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#161412] hover:bg-[#24201c] border border-[#2e2925] hover:border-[#ff5b14] text-[#efe8dc] transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-[#ff5b14] group-hover:scale-110 transition-transform" />
              <span className="font-mono text-xs uppercase tracking-wider hidden sm:inline font-bold">
                Order Tray
              </span>
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#ff5b14] text-[#0b0a09] rounded-full min-w-5">
                {totalCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden p-2 rounded-lg bg-[#161412] border border-[#24201c] text-[#efe8dc] hover:text-[#ff5b14]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0a09] border-b border-[#24201c] px-4 py-5 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161412] border border-[#24201c] text-[11px] font-mono text-[#8c847a]">
            <Flame className="w-3.5 h-3.5 text-[#ff5b14]" />
            <span className="text-[#efe8dc]">ROASTER ACTIVE:</span>
            <span className="text-[#ff5b14]">BATCH #408 ETHIOPIA</span>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded font-display text-lg font-bold tracking-wider text-[#efe8dc] hover:text-[#ff5b14] hover:bg-[#161412] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
