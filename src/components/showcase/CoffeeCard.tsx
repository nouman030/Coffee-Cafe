"use client";

import React, { useState } from "react";
import { CoffeeItem } from "@/data/coffees";
import { TastingRadar } from "./TastingRadar";
import { useCart } from "@/context/CartContext";
import { Plus, Check, MapPin, Mountain, Flame } from "lucide-react";

export function CoffeeCard({ coffee }: { coffee: CoffeeItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      category: coffee.categoryLabel,
      notes: coffee.tastingNotes.slice(0, 2).join(", "),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const roastBadgeColors = {
    Light: "bg-[#ffd8b6]/15 text-[#ffd8b6] border-[#ffd8b6]/30",
    Medium: "bg-[#ff9262]/15 text-[#ff9262] border-[#ff9262]/30",
    "Medium-Dark": "bg-[#ff5b14]/15 text-[#ff5b14] border-[#ff5b14]/30",
    Dark: "bg-[#e33f00]/20 text-[#ff5b14] border-[#e33f00]/40",
  }[coffee.roastLevel];

  return (
    <article
      className="group relative flex flex-col justify-between bg-[#161412] hover:bg-[#1c1a18] border border-[#24201c] hover:border-[#ff5b14]/60 rounded-xl p-6 transition-all duration-300 shadow-xl hover:shadow-[0_10px_35px_-10px_rgba(255,91,20,0.18)] hover:-translate-y-1"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#8c847a]">
            {coffee.categoryLabel}
          </span>
          <div className="flex items-center gap-2">
            {coffee.badge && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#ff5b14] text-[#0b0a09]">
                {coffee.badge}
              </span>
            )}
            <span
              className={`px-2 py-0.5 rounded border text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${roastBadgeColors}`}
            >
              <Flame className="w-2.5 h-2.5" />
              {coffee.roastLevel}
            </span>
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className="font-display font-black text-2xl text-[#efe8dc] group-hover:text-[#ff5b14] transition-colors leading-tight">
          {coffee.name}
        </h3>
        <p className="font-mono text-xs text-[#8c847a] mt-0.5">{coffee.subtitle}</p>

        {/* Origin Specs */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-[#24201c] text-xs font-mono text-[#8c847a]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#ff5b14]" />
            {coffee.origin}
          </span>
          <span className="flex items-center gap-1">
            <Mountain className="w-3 h-3 text-[#ff5b14]" />
            {coffee.elevation}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-[#8c847a] font-light mt-3 leading-relaxed">
          {coffee.description}
        </p>

        {/* Tasting Notes Tags */}
        <div className="mt-4 pt-3 border-t border-[#24201c]">
          <span className="text-[10px] font-mono tracking-wider text-[#8c847a] uppercase block mb-1.5">
            Key Tasting Notes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {coffee.tastingNotes.map((note) => (
              <span
                key={note}
                className="px-2.5 py-1 rounded bg-[#0b0a09] border border-[#24201c] group-hover:border-[#ff5b14]/40 text-xs font-mono text-[#efe8dc] transition-colors"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Sensory Profile Radar */}
        <div className="mt-4">
          <TastingRadar ratings={coffee.ratings} />
        </div>
      </div>

      {/* Card Bottom CTA & Pricing */}
      <div className="mt-6 pt-4 border-t border-[#24201c] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-[#8c847a] block uppercase">Extraction Price</span>
          <span className="font-mono text-2xl font-bold text-[#efe8dc]">
            ${coffee.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Add ${coffee.name} to order tray`}
          className={`px-4 py-2.5 rounded font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-all duration-200 active:scale-95 ${
            added
              ? "bg-emerald-500 text-black border-emerald-500"
              : "bg-[#1c1a18] hover:bg-[#ff5b14] text-[#efe8dc] hover:text-[#0b0a09] border border-[#2e2925] hover:border-[#ff5b14]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 text-[#ff5b14] group-hover:text-[#0b0a09]" />
              <span>Add to Tray</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}
