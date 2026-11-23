"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMBOS_CATALOG, ComboItem } from "@/data/combos";
import { useCart } from "@/context/CartContext";
import { Check, Sparkles, Tag, ArrowRight, Flame } from "lucide-react";

export function HorizontalCombos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;

    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 80;

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() + 500}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progressBar) {
            progressBar.style.width = `${progress * 100}%`;
          }
          const index = Math.min(
            COMBOS_CATALOG.length - 1,
            Math.floor(progress * COMBOS_CATALOG.length)
          );
          setActiveIdx(index);
        },
      });

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollAmount() + 500}`,
          scrub: 1,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

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
      ref={containerRef}
      aria-label="Special Combo Offers Pinned Horizontal Experience"
      className="relative bg-[#0b0a09] overflow-hidden min-h-screen flex flex-col justify-between py-12"
    >
      {/* Top Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#24201c] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#ff5b14] uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED PAIRINGS · LIMITED SLOTS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#efe8dc] tracking-tight uppercase">
              SPECIAL COMBO OFFERS
            </h2>
            <p className="text-[#8c847a] text-sm max-w-lg font-light mt-1">
              Scroll down vertically to glide through our 3 signature tasting & pastry pairings. Save up to 26%.
            </p>
          </div>

          {/* Stepper Progress Indicator */}
          <div className="flex items-center gap-3 font-mono text-xs text-[#8c847a]">
            <span>COMBO</span>
            <span className="text-[#ff5b14] font-bold text-lg">0{activeIdx + 1}</span>
            <span>/</span>
            <span>0{COMBOS_CATALOG.length}</span>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full h-1 bg-[#1c1a18] rounded-full overflow-hidden mt-4">
          <div
            ref={progressBarRef}
            className="h-full bg-[#ff5b14] transition-all duration-100 ease-out"
            style={{ width: "33%" }}
          />
        </div>
      </div>

      {/* Horizontal Cards Track (GSAP ScrollTrigger translates this leftwards) */}
      <div className="relative flex-1 flex items-center overflow-x-auto lg:overflow-x-visible no-scrollbar px-4 sm:px-8">
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 items-stretch will-change-transform py-4"
        >
          {COMBOS_CATALOG.map((combo, idx) => (
            <div
              key={combo.id}
              className="w-[85vw] sm:w-[480px] lg:w-[560px] flex-shrink-0 bg-[#161412] border border-[#24201c] hover:border-[#ff5b14]/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative group transition-all duration-300"
            >
              {/* Background Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 bg-[#ff5b14]/10 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />

              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-display text-4xl font-black text-[#ff5b14]/40 group-hover:text-[#ff5b14] transition-colors">
                    {combo.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-[#ff5b14]/15 border border-[#ff5b14]/30 font-mono text-xs font-bold text-[#ff5b14]">
                      {combo.discount}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-[#0b0a09] border border-[#24201c] font-mono text-xs uppercase tracking-wider text-[#efe8dc]">
                      {combo.badge}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-4xl text-[#efe8dc] group-hover:text-[#ff5b14] transition-colors leading-tight">
                  {combo.name}
                </h3>
                <p className="font-mono text-xs text-[#8c847a] mt-1">{combo.subtitle}</p>

                <p className="text-sm text-[#8c847a] font-light mt-4 leading-relaxed">
                  {combo.description}
                </p>

                {/* What's Included */}
                <div className="mt-6 pt-5 border-t border-[#24201c]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#ff5b14] block mb-2 font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> What&apos;s Included In This Combo:
                  </span>
                  <ul className="space-y-2">
                    {combo.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#efe8dc]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff5b14] mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pairing Notes */}
                <div className="mt-5 p-3.5 bg-[#0b0a09] border border-[#24201c] rounded-lg">
                  <span className="font-mono text-[10px] text-[#ff5b14] uppercase block tracking-wider font-bold">
                    Barista Sensory Note:
                  </span>
                  <p className="text-xs text-[#8c847a] mt-0.5 italic">
                    &ldquo;{combo.pairingNotes}&rdquo;
                  </p>
                </div>
              </div>

              {/* Card Footer: Pricing and Claim CTA */}
              <div className="mt-8 pt-5 border-t border-[#24201c] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-bold text-[#ff5b14]">
                      ${combo.price.toFixed(2)}
                    </span>
                    <span className="font-mono text-sm text-[#8c847a] line-through">
                      ${combo.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-[#8c847a] uppercase block">
                    Complete Set Price
                  </span>
                </div>

                <button
                  onClick={() => handleAddCombo(combo)}
                  className={`px-6 py-3.5 rounded font-display font-black tracking-wider text-sm uppercase transition-all duration-200 active:scale-95 flex items-center gap-2 ${
                    addedId === combo.id
                      ? "bg-emerald-500 text-black border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                      : "bg-[#ff5b14] hover:bg-[#e33f00] text-[#0b0a09] shadow-[0_0_20px_rgba(255,91,20,0.3)] hover:shadow-[0_0_30px_rgba(255,91,20,0.5)]"
                  }`}
                >
                  {addedId === combo.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Tray!</span>
                    </>
                  ) : (
                    <>
                      <span>Claim This Combo</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="max-w-7xl mx-auto px-4 w-full z-10 flex items-center justify-between text-xs font-mono text-[#8c847a] pt-4">
        <span className="flex items-center gap-2">
          <Flame className="w-3.5 h-3.5 text-[#ff5b14]" />
          Combos prepared fresh to order at counter or for pick-up
        </span>
        <span className="hidden sm:inline">↓ Continue scrolling down for Sensory Tasting Guide</span>
      </div>
    </section>
  );
}
