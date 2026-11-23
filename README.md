# NS Coffee — Artisanal Roastery & Specialty Cafe Landing Page

An agency-grade, dynamic landing page designed and crafted for **"NS Coffee"**, representing a \$1,500–\$2,000 tier specialty coffee web experience.

## ✨ Highlights & Features

- **Custom Animated Brand Logo**:
  - Handcrafted vector ceramic coffee cup with handle and saucer.
  - Distinct rising steam plumes powered by physics-based SVG oscillation and Anime.js.
  - Engraved **"NS"** branding embossed directly on the ceramic cup face.
- **Kinetic Hero Section**:
  - Punchy editorial typography (`Big Shoulders Display`) with staggered kinetic entrance.
  - Real-time HTML5 Canvas steam particle engine rendering natural vapor drift and glowing ember particles.
  - Micro-telemetry pill indicators (Elevation: 2,150 MASL, 16h Kyoto Cold Drip, 48-Hour Fresh Degas).
- **Curated Best-of-Cafe Showcase**:
  - 6 featured specialty drinks (Ethiopian Yirgacheffe G1, Kyoto Cold Drip, Spanish Smoked Cortado, Velvet Pistachio Cappuccino, Cascara Nitro Tonic, Midnight Sumatra).
  - Interactive category filter tabs and real-time live search.
  - Sensory profile bars for Acidity, Body, Sweetness, and Aroma.
  - Color-coded roast badges (Light, Medium, Medium-Dark, Dark) and SCA cupping specs.
- **Special Combo Offers (GSAP ScrollTrigger Pinned Horizontal Scroller)**:
  - Pinned vertical-to-horizontal scrolling track: as the user scrolls down vertically, the combo cards glide smoothly from right to left!
  - 3 signature combo pairings (The Morning Ritual, The Roaster's Tasting Flight, The Barista Reserve & Home Tin) with up to 26% savings.
  - Live scroll progress bar and stepper counter (`01 / 03`, `02 / 03`, `03 / 03`).
- **Sensory Roast Finder (Interactive Generative UI Widget)**:
  - 3-step recommendation engine matching user flavor, extraction, and ritual preferences to their ideal bean.
- **Artisan Roastery Process**:
  - 4-stage craft journey (Volcanic Micro-Lots, Loring Convection Drum Roasting, 48-Hour Controlled Degas, Scientific Extraction).
- **Interactive Slide-over Order Drawer**:
  - Stateful cart drawer with item additions, live subtotal and combo savings calculation, and celebratory confetti order checkout.
- **Tasting Room Hours & Footer**:
  - Central Portland Pearl District address, operating hours, public cupping schedule, and VIP Micro-Lot Drop email club.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) using custom `@theme` variables from `Design/DESIGN.md` & `variables.css`:
  - Primary Ember: `#ff5b14`
  - Obsidian Black: `#0b0a09`
  - Steamed Cream: `#efe8dc`
  - Charcoal / Ash: `#1c1a18`, `#8c847a`
- **Animation & Physics**:
  - [GSAP & ScrollTrigger](https://greensock.com/gsap/): Pinned horizontal scroll section
  - [Anime.js](https://animejs.com/): Logo steam path animation & hero staggered kinetic typography
  - HTML5 Canvas: Ambient vapor particles & ember sparks
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti): Order confirmation celebration
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Playwright](https://playwright.dev/) for cross-browser desktop & mobile responsive verification

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

### 4. Run Automated Playwright Tests
```bash
npm run test:e2e
```
Or with Playwright UI:
```bash
npx playwright test --ui
```
