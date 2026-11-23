"use client";

import React, { useState } from "react";
import { COFFEE_CATALOG, CoffeeItem } from "@/data/coffees";
import { useCart } from "@/context/CartContext";
import { Sparkles, Compass, Check, ArrowRight, RotateCcw } from "lucide-react";

export function RoastFinder() {
  const [flavor, setFlavor] = useState<string>("floral");
  const [brew, setBrew] = useState<string>("pourover");
  const [time, setTime] = useState<string>("morning");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  // Logic to compute ideal recommendation
  const getRecommendation = (): CoffeeItem => {
    if (flavor === "floral" || brew === "pourover") {
      return COFFEE_CATALOG[0]; // Ethiopian Yirgacheffe
    }
    if (flavor === "cacao" || brew === "cold") {
      return COFFEE_CATALOG[1]; // Kyoto Cold Drip
    }
    if (flavor === "smoky" || brew === "espresso") {
      return COFFEE_CATALOG[2]; // Spanish Smoked Cortado
    }
    if (flavor === "sweet" || brew === "latte") {
      return COFFEE_CATALOG[3]; // Velvet Pistachio
    }
    return COFFEE_CATALOG[5]; // Sumatra
  };

  const recommendedCoffee = getRecommendation();

  const handleAdd = () => {
    addItem({
      id: recommendedCoffee.id,
      name: recommendedCoffee.name,
      price: recommendedCoffee.price,
      category: "Personal Match",
      notes: recommendedCoffee.tastingNotes.slice(0, 2).join(", "),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <section
      id="guide"
      aria-label="Interactive Coffee Profile Recommendation Guide"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="bg-[#161412] border border-[#24201c] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#ff5b14]/15 rounded-full blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ff5b14] uppercase tracking-widest mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>SENSORY ROAST FINDER</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#efe8dc] tracking-tight uppercase">
            FIND YOUR PERFECT BEAN MATCH
          </h2>
          <p className="text-[#8c847a] text-sm sm:text-base font-light mt-2">
            Select your sensory preferences below. Our algorithm calculates your ideal single origin or signature beverage in real-time.
          </p>
        </div>

        {/* Interactive Selector Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Flavor Profile */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs uppercase tracking-wider text-[#efe8dc] flex items-center justify-between">
                <span>1. What flavor profiles inspire you?</span>
                <span className="text-[#ff5b14] font-bold">Step 1/3</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "floral", label: "Floral & Jasmine" },
                  { id: "cacao", label: "Dark Cacao & Oak" },
                  { id: "smoky", label: "Smoked Vanilla" },
                  { id: "sweet", label: "Pistachio Caramel" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFlavor(opt.id)}
                    className={`p-3 rounded-lg border text-xs font-mono text-left transition-all ${
                      flavor === opt.id
                        ? "bg-[#ff5b14] text-[#0b0a09] border-[#ff5b14] font-bold shadow-md"
                        : "bg-[#0b0a09] text-[#8c847a] border-[#24201c] hover:border-[#ff5b14]/40 hover:text-[#efe8dc]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Extraction Preference */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs uppercase tracking-wider text-[#efe8dc] flex items-center justify-between">
                <span>2. How do you prefer your extraction?</span>
                <span className="text-[#ff5b14] font-bold">Step 2/3</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "pourover", label: "Hand Pour-Over" },
                  { id: "cold", label: "16h Cold Drip" },
                  { id: "espresso", label: "9-Bar Ristretto" },
                  { id: "latte", label: "Velvety Micro-Foam" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setBrew(opt.id)}
                    className={`p-3 rounded-lg border text-xs font-mono text-left transition-all ${
                      brew === opt.id
                        ? "bg-[#ff5b14] text-[#0b0a09] border-[#ff5b14] font-bold shadow-md"
                        : "bg-[#0b0a09] text-[#8c847a] border-[#24201c] hover:border-[#ff5b14]/40 hover:text-[#efe8dc]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Ritual Time */}
            <div className="space-y-2.5">
              <label className="font-mono text-xs uppercase tracking-wider text-[#efe8dc] flex items-center justify-between">
                <span>3. Time of day ritual?</span>
                <span className="text-[#ff5b14] font-bold">Step 3/3</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "morning", label: "Morning Awakening" },
                  { id: "afternoon", label: "Afternoon Focus" },
                  { id: "evening", label: "Relaxed Golden Hour" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTime(opt.id)}
                    className={`p-3 rounded-lg border text-xs font-mono text-left transition-all ${
                      time === opt.id
                        ? "bg-[#ff5b14] text-[#0b0a09] border-[#ff5b14] font-bold shadow-md"
                        : "bg-[#0b0a09] text-[#8c847a] border-[#24201c] hover:border-[#ff5b14]/40 hover:text-[#efe8dc]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Match Output Card */}
          <div className="lg:col-span-5 bg-[#0b0a09] border border-[#2e2925] rounded-xl p-6 sm:p-7 relative group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#ff5b14] bg-[#ff5b14]/15 px-2.5 py-0.5 rounded border border-[#ff5b14]/30">
                100% SENSORY MATCH
              </span>
              <span className="font-mono text-xs text-[#8c847a]">
                {recommendedCoffee.roastLevel} Roast
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#efe8dc] leading-tight">
              {recommendedCoffee.name}
            </h3>
            <p className="font-mono text-xs text-[#8c847a] mt-1">{recommendedCoffee.subtitle}</p>

            <p className="text-xs text-[#8c847a] mt-3 leading-relaxed">
              {recommendedCoffee.description}
            </p>

            {/* Match attributes */}
            <div className="mt-4 pt-3 border-t border-[#1c1a18] space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8c847a]">Origin:</span>
                <span className="text-[#efe8dc]">{recommendedCoffee.origin}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8c847a]">Elevation:</span>
                <span className="text-[#efe8dc]">{recommendedCoffee.elevation}</span>
              </div>
            </div>

            {/* Notes */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recommendedCoffee.tastingNotes.map((note) => (
                <span
                  key={note}
                  className="px-2 py-0.5 rounded bg-[#161412] text-[11px] font-mono text-[#ffd8b6] border border-[#24201c]"
                >
                  {note}
                </span>
              ))}
            </div>

            {/* Match CTA */}
            <div className="mt-6 pt-4 border-t border-[#1c1a18] flex items-center justify-between">
              <span className="font-mono text-xl font-bold text-[#ff5b14]">
                ${recommendedCoffee.price.toFixed(2)}
              </span>

              <button
                onClick={handleAdd}
                className={`px-5 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all ${
                  added
                    ? "bg-emerald-500 text-black"
                    : "bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] shadow-lg"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added Match!</span>
                  </>
                ) : (
                  <>
                    <span>Add Match to Tray</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
