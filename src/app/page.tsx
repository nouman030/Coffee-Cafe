"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/navigation/Navbar";
import { CartDrawer } from "@/components/navigation/CartDrawer";
import { HeroSection } from "@/components/hero/HeroSection";
import { CoffeeMenu } from "@/components/showcase/CoffeeMenu";
import { HorizontalCombos } from "@/components/combos/HorizontalCombos";
import { RoastFinder } from "@/components/experience/RoastFinder";
import { RoasteryProcess } from "@/components/experience/RoasteryProcess";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <CartProvider>
      <div className="relative min-h-screen bg-[#0b0a09] text-[#efe8dc] overflow-x-hidden selection:bg-[#ff5b14] selection:text-[#0b0a09]">
        {/* Sticky Glassmorphism Navigation */}
        <Navbar />

        {/* Slide-over Roastery Order Drawer */}
        <CartDrawer />

        <main>
          {/* Hero Section with Steam Physics Canvas & Kinetic Typography */}
          <HeroSection />

          {/* Curated Coffee Menu ("Best in NS Cafe") */}
          <CoffeeMenu />

          {/* Special Combo Section: GSAP ScrollTrigger Pinned Horizontal Scroller */}
          <HorizontalCombos />

          {/* Interactive Roast Finder Sensory Matcher */}
          <RoastFinder />

          {/* 4-Pillar Artisan Craft & Roasting Process */}
          <RoasteryProcess />
        </main>

        {/* Roastery Counter Hours, District Location & VIP Drop Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
