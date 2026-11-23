"use client";

import React from "react";
import { Mountain, Flame, Wind, Droplets, ShieldCheck } from "lucide-react";

export function RoasteryProcess() {
  const steps = [
    {
      num: "01",
      icon: Mountain,
      title: "Volcanic Micro-Lots",
      subtitle: "Direct Ethical Trade",
      text: "We partner exclusively with multi-generational smallholder farms in high-altitude volcanic soils (2,000m+). We pay an average of 240% above commercial fair-trade floor prices.",
    },
    {
      num: "02",
      icon: Flame,
      title: "Convection Drum Roasting",
      subtitle: "Loring S35 Kestrel System",
      text: "Our roasters roast with closed-loop convection rather than direct scorching flame. Heat transfer is smooth, preserving delicate fruit acids, floral aromatics, and volatile terpenes.",
    },
    {
      num: "03",
      icon: Wind,
      title: "Nitrogen Peak Conditioning",
      subtitle: "48-Hour Controlled Degas",
      text: "Coffee is rested in oxygen-purged silos to release excess CO₂ without staling, then packed in one-way valved tins to guarantee the exact peak cupping window.",
    },
    {
      num: "04",
      icon: Droplets,
      title: "Scientific Extraction",
      subtitle: "Slayer 9-Bar & 16h Kyoto Drip",
      text: "Every shot is pulled with pre-infusion needle valves and custom mineral-balanced water (120ppm, pH 7.2). Cold drips drop at 1 beat per second for 16 unhurried hours.",
    },
  ];

  return (
    <section
      id="craft"
      aria-label="Our Artisan Roasting and Extraction Craft"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#24201c]"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-widest text-[#ff5b14] block mb-2">
          // ARTISANAL PILLARS
        </span>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#efe8dc] tracking-tight uppercase">
          THE ARTISAN PROCESS
        </h2>
        <p className="text-[#8c847a] text-sm sm:text-base font-light mt-3">
          Specialty coffee is not an accident. It is the obsessive calibration of soil chemistry, thermodynamics, and barista craft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="bg-[#161412] border border-[#24201c] hover:border-[#ff5b14]/50 rounded-xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-4xl font-black text-[#ff5b14]/30 group-hover:text-[#ff5b14] transition-colors">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#0b0a09] border border-[#24201c] flex items-center justify-center text-[#ff5b14] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl text-[#efe8dc] group-hover:text-[#ff5b14] transition-colors">
                  {step.title}
                </h3>
                <span className="font-mono text-xs text-[#8c847a] block mt-0.5">
                  {step.subtitle}
                </span>

                <p className="text-xs text-[#8c847a] font-light mt-3 leading-relaxed">
                  {step.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#24201c] flex items-center gap-1.5 text-[10px] font-mono text-[#8c847a]">
                <ShieldCheck className="w-3 h-3 text-[#ff5b14]" />
                <span>SCA Certified Standard</span>
              </div>
            </div>
          );
        })}
      </div>
      {/* Cinematic Master Artwork Centerpiece */}
      <div className="relative mt-16 rounded-2xl overflow-hidden bg-[#161412] border border-[#24201c] group">
        <div className="relative aspect-[21/9] w-full overflow-hidden max-h-[460px]">
          <img
            src="/Gemini_Generated_Image_d2790hd2790hd279.png"
            alt="NS Coffee Roastery artisanal craft and slow extraction"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#ff5b14] bg-[#ff5b14]/15 px-3 py-1 rounded border border-[#ff5b14]/30">
                NS MASTER LABORATORY
              </span>
              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#efe8dc] mt-2 uppercase">
                FROM VOLCANIC SOIL TO CUP
              </h3>
              <p className="text-xs sm:text-sm text-[#8c847a] max-w-lg mt-1 font-light">
                Obsessively calibrated at 204°C closed-loop convection roasting. Every single lot is cupped, profiled, and sealed fresh.
              </p>
            </div>
            <div className="font-mono text-xs text-[#8c847a] bg-[#0b0a09]/80 backdrop-blur-sm p-3 rounded-lg border border-[#24201c] flex items-center gap-4">
              <div>
                <span className="block text-[10px] text-[#8c847a]">ROASTER</span>
                <span className="text-[#efe8dc] font-bold">Loring S35</span>
              </div>
              <div>
                <span className="block text-[10px] text-[#8c847a]">WATER TDS</span>
                <span className="text-[#ff5b14] font-bold">120 PPM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
