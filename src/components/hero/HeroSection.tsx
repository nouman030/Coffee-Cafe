"use client";

import React, { useEffect, useRef, useState } from "react";
import { CoffeeHeroVisual } from "./CoffeeHeroVisual";
import { ArrowDownRight, Sparkles, MapPin, Plus, Check } from "lucide-react";
import { animate, stagger } from "animejs";
import { useCart } from "@/context/CartContext";

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    try {
      if (typeof animate === "function") {
        animate(".hero-stagger", {
          translateY: [24, 0],
          opacity: [0, 1],
          ease: "outExpo",
          duration: 900,
          delay: stagger(120, { start: 200 }),
        });
      }
    } catch {
      // fallback
    }
  }, []);

  const handleQuickAdd = () => {
    addItem({
      id: "ethiopian-yirgacheffe",
      name: "Ethiopian Yirgacheffe G1",
      price: 6.50,
      category: "Single Origin",
      notes: "Jasmine Blossom, Candied Citrus",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section
      id="hero"
      aria-label="Welcome to NS Coffee Roasters"
      className="relative min-h-[96vh] flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0b0a09]"
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[650px] bg-[#ff5b14]/15 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main 2-Column Area (Vertically Centered) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 my-auto py-6 sm:py-10">
        {/* Left Column: Copy & Value Propositions */}
        <div className="space-y-6">
          {/* Micro-label */}
          <div
            ref={badgeRef}
            className="hero-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161412] border border-[#2e2925] text-xs font-mono text-[#ff5b14]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span className="tracking-widest uppercase text-[#efe8dc]">
              SPECIALTY MICRO-BATCH ROASTERY
            </span>
            <span className="text-[#8c847a]">·</span>
            <span className="text-[#ff5b14] font-bold">LIMITED DROP</span>
          </div>

          {/* High-Impact Headline */}
          <h1
            ref={headlineRef}
            className="hero-stagger font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#efe8dc] leading-[0.92] uppercase"
          >
            CRAFTED FOR <br />
            <span className="text-[#ff5b14] relative inline-block">
              THE OBSESSED.
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#ff5b14] opacity-80" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-stagger text-[#8c847a] text-sm sm:text-lg max-w-xl font-light leading-relaxed">
            We source rare single-origin micro-lots from 2,100m volcanic soils. Small-batch drum roasted at 204°C and extracted through slow Kyoto cold drip and 9-bar precision espresso.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="hero-stagger flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a
              href="#roasts"
              className="px-6 sm:px-7 py-3.5 bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] font-display font-black tracking-widest text-base sm:text-lg uppercase transition-all shadow-[0_0_25px_rgba(255,91,20,0.35)] hover:shadow-[0_0_40px_rgba(255,91,20,0.6)] hover:scale-[1.02] active:scale-[0.98] inline-flex items-center justify-center gap-2 rounded-xl"
            >
              <span>Explore Best Roasts</span>
              <ArrowDownRight className="w-5 h-5" />
            </a>

            <a
              href="#combos"
              className="px-5 sm:px-6 py-3.5 bg-[#161412] hover:bg-[#1c1a18] text-[#efe8dc] border border-[#2e2925] hover:border-[#ff5b14] font-display font-bold tracking-wider text-sm sm:text-base uppercase transition-all inline-flex items-center justify-center gap-2 rounded-xl"
            >
              <span>Special Combos (30% Off)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Open Floating Coffee Visual with Dynamic Steam Canvas */}
        <div className="relative flex items-center justify-center w-full">
          <CoffeeHeroVisual onQuickAdd={handleQuickAdd} />
        </div>
      </div>

      {/* Bottom Horizontal Dock Bar: Telemetry (Left) + Featured Origin Card (Right) */}
      <div className="max-w-7xl mx-auto w-full pt-4 sm:pt-6 border-t border-[#1c1a18] relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
          {/* Left Telemetry Strip */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 lg:gap-10 py-1 w-full lg:w-auto">
            <div className="border-r border-[#1c1a18] sm:border-r-0 pr-2 sm:pr-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#8c847a] block uppercase tracking-wider">
                ELEVATION
              </span>
              <span className="font-mono text-[11px] sm:text-sm lg:text-base font-bold text-[#efe8dc] leading-tight block">
                2,150 MASL
              </span>
            </div>
            <div className="border-r border-[#1c1a18] sm:border-r-0 px-2 sm:px-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#8c847a] block uppercase tracking-wider">
                EXTRACTION
              </span>
              <span className="font-mono text-[11px] sm:text-sm lg:text-base font-bold text-[#ff5b14] leading-tight block">
                <span className="sm:hidden">16h Cold Drip</span>
                <span className="hidden sm:inline">16h Slow Cold Drip</span>
              </span>
            </div>
            <div className="pl-2 sm:pl-0">
              <span className="font-mono text-[9px] sm:text-[10px] text-[#8c847a] block uppercase tracking-wider">
                FRESH DEGAS
              </span>
              <span className="font-mono text-[11px] sm:text-sm lg:text-base font-bold text-[#efe8dc] leading-tight block">
                48-Hour Peak
              </span>
            </div>
          </div>

          {/* Right Featured Origin Card Dock (No Star Decal) */}
          <div className="relative w-full lg:w-auto">
            <div className="bg-[#161412]/90 backdrop-blur-md border border-[#2e2925] hover:border-[#ff5b14]/60 rounded-xl px-4 py-2.5 shadow-2xl flex items-center justify-between sm:justify-start gap-4 sm:gap-6 transition-all">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b14] animate-ping" />
                  <span className="font-mono text-[9px] tracking-widest text-[#ff5b14] uppercase font-bold">
                    FEATURED ORIGIN
                  </span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-[#efe8dc] tracking-wider uppercase leading-tight mt-0.5 truncate">
                  ETHIOPIA YIRGACHEFFE
                </h3>
                <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-[#8c847a]">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5 text-[#ff5b14]" /> Gedeb Zone
                  </span>
                  <span>·</span>
                  <span>2,150 MASL</span>
                </div>
              </div>

              <div className="border-l border-[#2e2925] pl-4 text-right flex flex-col items-end shrink-0">
                <span className="font-mono text-[9px] text-[#8c847a] uppercase block">Price</span>
                <span className="font-mono text-base sm:text-lg font-bold text-[#efe8dc] leading-tight">
                  $6.50
                </span>
                <button
                  onClick={handleQuickAdd}
                  aria-label="Add Ethiopian Yirgacheffe to Tray"
                  className={`mt-1 px-3 py-1 rounded text-[10px] font-mono uppercase font-bold tracking-wider flex items-center gap-1 transition-all active:scale-95 ${
                    added
                      ? "bg-emerald-500 text-black"
                      : "bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] shadow-sm"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3" />
                      <span>ADD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
