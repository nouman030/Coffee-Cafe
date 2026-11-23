"use client";

import React from "react";
import { SteamCanvas } from "@/components/brand/SteamCanvas";

export function CoffeeHeroVisual({ onQuickAdd }: { onQuickAdd?: () => void }) {
  return (
    <div className="relative w-full flex items-center justify-center select-none py-2">
      {/* Ambient Ember Backlight (Soft, organic radial glow centered on the cup) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] bg-[#ff5b14]/22 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Coffee Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[480px] md:max-w-[580px] lg:max-w-[700px] aspect-square flex items-center justify-center">
        {/* Dynamic Steam Canvas Centered Over Cup */}
        <SteamCanvas className="absolute inset-0 w-full h-full z-20 pointer-events-none" />

        {/* Ambient Ground Shadow under the floating cup */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 max-w-[460px] h-10 bg-black/75 rounded-[100%] blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Layer 1: Ambient Coffee Liquid Splash Surge (Behind Cup) */}
        <div
          className="absolute -top-6 -right-6 w-[95%] h-[95%] z-[5] pointer-events-none opacity-80 animate-coffee-float"
          style={{ animationDuration: "8s", animationDelay: "-2s" }}
          aria-hidden="true"
        >
          <picture>
            <source srcSet="/hero-coffee-splash.webp" type="image/webp" />
            <img
              src="/hero-coffee-splash.png"
              alt="NS Coffee artisanal cold brew liquid splash burst"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(255,91,20,0.2)]"
            />
          </picture>
        </div>

        {/* Layer 2: Main Floating NS Coffee Cup with Branded NS Emblem */}
        <div
          className="relative z-10 w-full aspect-square flex items-center justify-center animate-coffee-float transition-transform duration-500 hover:scale-105 cursor-pointer"
          onClick={onQuickAdd}
          title="NS Coffee Signature Brew - Click to add to tray"
        >
          <picture>
            <source srcSet="/hero-coffee-cup.webp" type="image/webp" />
            <img
              src="/hero-coffee-cup.png"
              alt="NS Coffee open floating brew with engraved NS logo and popping lid"
              className="w-full h-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] filter"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
