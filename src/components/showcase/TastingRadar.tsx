"use client";

import React from "react";

interface TastingRadarProps {
  ratings: {
    acidity: number;
    body: number;
    sweetness: number;
    aroma: number;
  };
}

export function TastingRadar({ ratings }: TastingRadarProps) {
  const metrics = [
    { label: "Acidity", val: ratings.acidity },
    { label: "Body", val: ratings.body },
    { label: "Sweetness", val: ratings.sweetness },
    { label: "Aroma", val: ratings.aroma },
  ];

  return (
    <div className="space-y-1.5 pt-2">
      <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#8c847a]">
        <span>Sensory Profile</span>
        <span>Scale 1-5</span>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {metrics.map((m) => (
          <div key={m.label} className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-[#8c847a]">{m.label}</span>
              <span className="text-[#efe8dc] font-bold">{m.val}/5</span>
            </div>
            {/* 5-step dots or progress bar */}
            <div className="flex gap-1 h-1.5">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    step <= m.val ? "bg-[#ff5b14]" : "bg-[#24201c]"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
