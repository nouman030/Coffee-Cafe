"use client";

import React, { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MapPin, Clock, Mail, Phone, Check, ArrowRight, ShieldCheck } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <footer
      id="visit"
      aria-label="Cafe Location, Operating Hours and Contact"
      className="bg-[#080706] border-t border-[#24201c] text-[#efe8dc] pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1c1a18]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-[#8c847a] max-w-sm font-light leading-relaxed">
              NS Coffee is a boutique micro-roaster and specialty tasting laboratory. We roast small-batch single origins and slow cold drips for coffee obsessives who value craftsmanship above all else.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ff5b14]">
              <span className="w-2 h-2 rounded-full bg-[#ff5b14] animate-ping" />
              <span>ROASTERY DOORS OPEN TODAY</span>
            </div>
          </div>

          {/* Col 2: Location & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5b14] font-bold">
              Tasting Room & Roastery
            </h4>
            <div className="space-y-2.5 text-xs text-[#8c847a]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ff5b14] flex-shrink-0 mt-0.5" />
                <span>
                  428 NW 11th Ave, Pearl Arts District <br />
                  Portland, OR 97209
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ff5b14] flex-shrink-0" />
                <span>(503) 555-0194</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ff5b14] flex-shrink-0" />
                <span className="font-mono">hello@nscoffee.example</span>
              </div>
            </div>
          </div>

          {/* Col 3: Counter Hours */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5b14] font-bold">
              Counter Hours
            </h4>
            <ul className="space-y-2 text-xs text-[#8c847a] font-mono">
              <li className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-[#efe8dc]">7am – 7pm</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-[#efe8dc]">8am – 8pm</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-[#efe8dc]">8am – 6pm</span>
              </li>
              <li className="pt-2 text-[11px] text-[#ff5b14]">
                Public Cuppings: Thu 5pm
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Drop Club */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff5b14] font-bold">
              VIP Micro-Lot Drops
            </h4>
            <p className="text-xs text-[#8c847a]">
              Receive secret drop notices 48 hours before rare single-origin lots hit the public cafe menu.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#161412] border border-emerald-500/40 rounded text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Welcome to the VIP Drop Club!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#161412] border border-[#24201c] focus:border-[#ff5b14] focus:outline-none rounded px-3 py-2 text-xs text-[#efe8dc] placeholder-[#8c847a]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to VIP drop notices"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#ff5b14] text-[#0b0a09] font-mono text-xs font-bold rounded flex items-center hover:bg-[#e33f00] transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#8c847a] block">
                  Zero spam. Strictly fresh roast notifications only.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8c847a]">
          <div>
            © {new Date().getFullYear()} NS Coffee Roasters. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#efe8dc] transition-colors cursor-pointer">
              SCA Certified Roaster
            </span>
            <span className="hover:text-[#efe8dc] transition-colors cursor-pointer">
              Accessibility Statement (WCAG AAA)
            </span>
            <span className="hover:text-[#efe8dc] transition-colors cursor-pointer">
              Direct Trade Protocol
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
