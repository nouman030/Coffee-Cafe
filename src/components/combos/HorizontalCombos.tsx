"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { COMBOS_CATALOG, ComboItem } from "@/data/combos";
import { useCart } from "@/context/CartContext";
import {
  Check,
  Sparkles,
  Tag,
  ArrowRight,
  Flame,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

const AUTO_PLAY_INTERVAL = 5500; // 5.5 seconds per slide

export function HorizontalCombos() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100%
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = COMBOS_CATALOG.length;

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  const handleGoTo = (index: number) => {
    setActiveIdx(index);
    setProgress(0);
  };

  // Autoplay ticker with smooth progress bar
  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const intervalStep = 50; // update progress every 50ms
    const stepIncrement = (intervalStep / AUTO_PLAY_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + stepIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext(); // swipe left -> next
    } else if (distance < -50) {
      handlePrev(); // swipe right -> prev
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const handleAddCombo = (combo: ComboItem) => {
    addItem({
      id: combo.id,
      name: combo.name,
      price: combo.price,
      originalPrice: combo.originalPrice,
      category: "Special Combo",
      notes: combo.includes.slice(0, 2).join(" + "),
    });
    setAddedId(combo.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section
      id="combos"
      aria-label="Special Combo Offers Auto-Navigating Experience"
      className="relative bg-[#0b0a09] overflow-hidden py-16 sm:py-24 border-t border-[#1c1a18]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#ff5b14]/8 rounded-full blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Section Header with Left/Right Navigators & Auto Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#24201c] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ff5b14] uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED PAIRINGS · LIMITED SLOTS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#efe8dc] tracking-tight uppercase">
              SPECIAL COMBO OFFERS
            </h2>
            <p className="text-[#8c847a] text-sm sm:text-base max-w-xl font-light mt-1">
              Hand-crafted tasting and pastry pairings roasted fresh in small batches. Enjoy up to 26% off complete specialty flight experiences.
            </p>
          </div>

          {/* Controls: Left & Right Navigators + Auto-Play Toggle + Stepper */}
          <div className="flex items-center gap-4 self-start md:self-end">
            {/* Stepper Index */}
            <div className="font-mono text-xs text-[#8c847a] flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161412] border border-[#24201c]">
              <span>COMBO</span>
              <span className="text-[#ff5b14] font-bold text-base">0{activeIdx + 1}</span>
              <span>/</span>
              <span>0{total}</span>
            </div>

            {/* Auto-Play Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause auto navigation" : "Resume auto navigation"}
              className="p-2.5 rounded-lg bg-[#161412] hover:bg-[#24201c] border border-[#2e2925] hover:border-[#ff5b14] text-[#8c847a] hover:text-[#efe8dc] transition-all flex items-center gap-1.5 font-mono text-xs"
              title={isPlaying ? "Pause auto-scroll" : "Start auto-scroll"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#ff5b14]" />
                  <span className="hidden sm:inline text-[11px] uppercase">Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline text-[11px] uppercase">Paused</span>
                </>
              )}
            </button>

            {/* Left Navigator Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous combo offer"
              className="p-3 rounded-xl bg-[#161412] hover:bg-[#ff5b14] border border-[#2e2925] hover:border-[#ff5b14] text-[#efe8dc] hover:text-[#0b0a09] transition-all duration-200 active:scale-95 shadow-lg group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>

            {/* Right Navigator Button */}
            <button
              onClick={handleNext}
              aria-label="Next combo offer"
              className="p-3 rounded-xl bg-[#161412] hover:bg-[#ff5b14] border border-[#2e2925] hover:border-[#ff5b14] text-[#efe8dc] hover:text-[#0b0a09] transition-all duration-200 active:scale-95 shadow-lg group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Global Auto-Going Progress Bar */}
        <div className="w-full h-1 bg-[#1c1a18] rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-[#ff5b14] transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(255,91,20,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Interactive Tab Stepper Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6">
          {COMBOS_CATALOG.map((combo, idx) => (
            <button
              key={combo.id}
              onClick={() => handleGoTo(idx)}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                activeIdx === idx
                  ? "bg-[#ff5b14] text-[#0b0a09] font-bold shadow-[0_0_15px_rgba(255,91,20,0.35)] scale-105"
                  : "bg-[#161412] text-[#8c847a] hover:text-[#efe8dc] border border-[#24201c] hover:border-[#ff5b14]/50"
              }`}
            >
              <span>{combo.number}</span>
              <span className="hidden sm:inline">{combo.name}</span>
            </button>
          ))}
        </div>

        {/* Carousel Slider Container (Swipeable & Auto-Navigating) */}
        <div
          className="relative mt-8 overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track with Smooth CSS Transition */}
          <div
            className="flex transition-transform duration-700 ease-out will-change-transform"
            style={{
              transform: `translateX(-${activeIdx * 100}%)`,
            }}
          >
            {COMBOS_CATALOG.map((combo, idx) => {
              const isActive = idx === activeIdx;
              return (
                <div
                  key={combo.id}
                  className="w-full flex-shrink-0 px-1 sm:px-2"
                  aria-hidden={!isActive}
                >
                  <div
                    className={`bg-[#161412] border rounded-2xl p-6 sm:p-10 shadow-2xl relative group transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                      isActive
                        ? "border-[#ff5b14]/60 shadow-[0_15px_45px_rgba(0,0,0,0.9)]"
                        : "border-[#24201c] opacity-80"
                    }`}
                  >
                    {/* Background Glow */}
                    <div
                      className="absolute top-0 right-0 w-80 h-80 bg-[#ff5b14]/12 rounded-full blur-3xl pointer-events-none transition-opacity"
                      aria-hidden="true"
                    />

                    {/* Left Column (Details, Inclusions, Sensory Notes) */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        {/* Header Badge & Number */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-display text-5xl sm:text-6xl font-black text-[#ff5b14]">
                            {combo.number}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded bg-[#ff5b14]/15 border border-[#ff5b14]/30 font-mono text-xs font-bold text-[#ff5b14]">
                              {combo.discount}
                            </span>
                            <span className="px-3 py-1 rounded bg-[#0b0a09] border border-[#24201c] font-mono text-xs uppercase tracking-wider text-[#efe8dc]">
                              {combo.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#efe8dc] group-hover:text-[#ff5b14] transition-colors leading-[1.05]">
                          {combo.name}
                        </h3>
                        <p className="font-mono text-xs sm:text-sm text-[#ff9262] mt-1.5 font-semibold">
                          {combo.subtitle}
                        </p>

                        <p className="text-sm sm:text-base text-[#8c847a] font-light mt-4 leading-relaxed">
                          {combo.description}
                        </p>
                      </div>

                      {/* What's Included */}
                      <div className="pt-4 border-t border-[#24201c]">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#ff5b14] block mb-3 font-bold flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" /> What&apos;s Included In This Combo:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {combo.includes.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[#efe8dc] bg-[#0b0a09]/70 px-3 py-2 rounded-lg border border-[#24201c]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b14] mt-1.5 flex-shrink-0" />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column (Sensory Notes, Pricing & Quick Add) */}
                    <div className="lg:col-span-5 bg-[#0b0a09] border border-[#24201c] rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      {/* Sensory Note Box */}
                      <div>
                        <span className="font-mono text-xs text-[#ff5b14] uppercase tracking-wider font-bold block mb-1.5 flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5" /> Barista Sensory Note:
                        </span>
                        <p className="text-xs sm:text-sm text-[#8c847a] italic leading-relaxed">
                          &ldquo;{combo.pairingNotes}&rdquo;
                        </p>
                      </div>

                      {/* Pricing & Claim Button */}
                      <div className="pt-6 border-t border-[#24201c]">
                        <div className="flex items-baseline gap-3 mb-1">
                          <span className="font-mono text-3xl sm:text-4xl font-black text-[#ff5b14]">
                            ${combo.price.toFixed(2)}
                          </span>
                          <span className="font-mono text-base text-[#8c847a] line-through">
                            ${combo.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#8c847a] uppercase block mb-5">
                          Complete Combo Price · Taxes Included
                        </span>

                        <button
                          onClick={() => handleAddCombo(combo)}
                          className={`w-full py-4 rounded-xl font-display font-black tracking-widest text-base uppercase transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
                            addedId === combo.id
                              ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                              : "bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] shadow-[0_0_25px_rgba(255,91,20,0.35)] hover:shadow-[0_0_35px_rgba(255,91,20,0.6)] hover:scale-[1.02]"
                          }`}
                        >
                          {addedId === combo.id ? (
                            <>
                              <Check className="w-5 h-5" />
                              <span>Added to Order Tray!</span>
                            </>
                          ) : (
                            <>
                              <span>Claim This Combo</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Indicators & Roastery Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-[#1c1a18] text-xs font-mono text-[#8c847a]">
          <div className="flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#ff5b14]" />
            <span>Prepared fresh to order at the counter or packaged for pickup</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#8c847a]">Slide {activeIdx + 1} of {total}</span>
            <div className="flex items-center gap-1">
              {COMBOS_CATALOG.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleGoTo(i)}
                  aria-label={`Go to combo ${i + 1}`}
                  className="p-2 min-w-7 min-h-7 flex items-center justify-center rounded-full focus-visible:ring-1 focus-visible:ring-[#ff5b14]"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === i ? "w-6 bg-[#ff5b14]" : "w-1.5 bg-[#24201c] hover:bg-[#8c847a]"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
