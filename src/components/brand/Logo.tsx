"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  const steam1Ref = useRef<SVGPathElement>(null);
  const steam2Ref = useRef<SVGPathElement>(null);
  const steam3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    try {
      const paths = [steam1Ref.current, steam2Ref.current, steam3Ref.current].filter(Boolean) as SVGPathElement[];
      if (paths.length > 0 && typeof animate === "function") {
        animate(paths, {
          translateY: [-2, -8],
          opacity: [0.35, 0.95],
          ease: "inOutSine",
          duration: 1800,
          alternate: true,
          loop: true,
          delay: stagger(280),
        });
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  const dimensions = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  }[size];

  return (
    <div className={`flex items-center gap-3.5 select-none group cursor-pointer ${className}`}>
      {/* Animated Coffee Cup + Steam + NS Inscription */}
      <div className={`relative ${dimensions} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-[0_2px_8px_rgba(255,91,20,0.18)]"
          aria-label="NS Coffee Logo: Steaming artisanal coffee cup with NS brand mark"
        >
          {/* Ambient Glow behind cup */}
          <circle cx="34" cy="38" r="18" fill="#ff5b14" fillOpacity="0.12" className="transition-opacity group-hover:fillOpacity-30" />

          {/* Steam Stream 1 (Left - Ember Orange) */}
          <path
            ref={steam1Ref}
            className="steam-plume stroke-[#ff5b14]"
            d="M24 19C22 13 26 8 23 2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Steam Stream 2 (Center - Velvety Cream) */}
          <path
            ref={steam2Ref}
            className="steam-plume stroke-[#efe8dc]"
            d="M34 17C32 11 36 6 34 1"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Steam Stream 3 (Right - Ember Orange) */}
          <path
            ref={steam3Ref}
            className="steam-plume stroke-[#ff5b14]"
            d="M44 19C42 13 46 8 43 2"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cup Rim Highlight */}
          <ellipse cx="34" cy="24" rx="19" ry="3.5" fill="#24201c" stroke="#ff5b14" strokeWidth="1.5" />
          <ellipse cx="34" cy="24" rx="16" ry="2.2" fill="#0b0a09" />

          {/* Cup Body */}
          <path
            d="M15 24H53V39C53 48.5 44.5 56 34 56C23.5 56 15 48.5 15 39V24Z"
            fill="#161412"
            stroke="#efe8dc"
            strokeWidth="2.2"
            className="transition-colors group-hover:stroke-[#ff5b14]"
          />

          {/* Cup Handle */}
          <path
            d="M53 29H58.5C61.5 29 64 31.5 64 34.5C64 37.5 61.5 40 58.5 40H52"
            stroke="#efe8dc"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            className="transition-colors group-hover:stroke-[#ff5b14]"
          />

          {/* Cup Ceramic Base / Saucer */}
          <path
            d="M10 59C16 63 52 63 58 59"
            stroke="#8c847a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Engraved "NS" on Cup Surface */}
          <text
            x="34"
            y="43"
            textAnchor="middle"
            fill="#ff5b14"
            fontSize="12.5"
            fontWeight="900"
            letterSpacing="0.08em"
            fontFamily="var(--font-mono)"
            className="select-none font-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
          >
            NS
          </text>
        </svg>
      </div>

      {/* Typography Brand Name */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-black tracking-wider text-xl sm:text-2xl text-[#efe8dc] group-hover:text-[#ff5b14] transition-colors leading-none">
              NS COFFEE
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5b14] animate-ping" />
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8c847a] uppercase leading-tight mt-0.5">
            Artisanal Micro-Roastery
          </span>
        </div>
      )}
    </div>
  );
}
