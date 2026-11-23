"use client";

import React, { useState } from "react";
import { COFFEE_CATALOG, CoffeeItem } from "@/data/coffees";
import { CoffeeCard } from "./CoffeeCard";
import { Sparkles, SlidersHorizontal, Search } from "lucide-react";

export function CoffeeMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Curations" },
    { id: "single-origin", label: "Single Origin" },
    { id: "cold-drip", label: "Slow Cold Drip" },
    { id: "espresso", label: "Espresso Craft" },
    { id: "signature", label: "Signature Lattes" },
  ];

  const filteredCoffees = COFFEE_CATALOG.filter((coffee) => {
    const matchesCategory =
      activeCategory === "all" ? true : coffee.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : coffee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coffee.tastingNotes.some((n) =>
            n.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          coffee.origin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="roasts"
      aria-label="Curated Specialty Coffee Menu"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#24201c] pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ff5b14] uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAFE ROTATING SELECTION</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#efe8dc] tracking-tight uppercase">
            BEST IN NS CAFE
          </h2>
          <p className="text-[#8c847a] text-sm sm:text-base max-w-xl font-light mt-2">
            Every bean is cupped according to Specialty Coffee Association (SCA) 86+ standards. Extracted on custom precision equipment.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8c847a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search notes, origin, name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161412] border border-[#24201c] focus:border-[#ff5b14] focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-xs font-mono text-[#efe8dc] placeholder-[#8c847a]"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat.id
                ? "bg-[#ff5b14] text-[#0b0a09] font-bold shadow-[0_0_15px_rgba(255,91,20,0.3)]"
                : "bg-[#161412] text-[#8c847a] hover:text-[#efe8dc] border border-[#24201c] hover:border-[#ff5b14]/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Coffee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredCoffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>

      {filteredCoffees.length === 0 && (
        <div className="text-center py-16 bg-[#161412] border border-[#24201c] rounded-xl p-8">
          <p className="font-mono text-sm text-[#8c847a]">
            No coffees found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
            className="mt-3 px-4 py-2 bg-[#ff5b14] text-[#0b0a09] font-mono text-xs uppercase font-bold rounded"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
