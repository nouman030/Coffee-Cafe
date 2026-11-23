export interface ComboItem {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  badge: string;
  discount: string;
  price: number;
  originalPrice: number;
  description: string;
  includes: string[];
  pairingNotes: string;
  accentColor: string;
}

export const COMBOS_CATALOG: ComboItem[] = [
  {
    id: "combo-morning-ritual",
    number: "01",
    name: "The Morning Ritual Combo",
    subtitle: "Artisanal Flat White & Warm Brioche",
    badge: "Most Popular Morning Pick",
    discount: "Save 22%",
    price: 14.00,
    originalPrice: 18.00,
    description: "The quintessential daily awakening. A velvety single-origin flat white paired with a double-baked almond croissant prepared with Normandy cultured butter.",
    includes: [
      "Single-Origin Double Ristretto Flat White",
      "Handmade Double-Baked Almond Brioche Croissant",
      "Roaster's Tasting Profile & Origin Cupping Card",
    ],
    pairingNotes: "The caramelized nuttiness of the almond frangipane cuts through the bright citrus acidity of our Ethiopian roast.",
    accentColor: "#ff5b14",
  },
  {
    id: "combo-tasting-flight",
    number: "02",
    name: "The Roaster's Tasting Flight",
    subtitle: "Three Continents Micro-Lot Triad",
    badge: "Sensory Connoisseur",
    discount: "Save 24%",
    price: 22.00,
    originalPrice: 29.00,
    description: "Experience the profound spectrum of specialty coffee. Three side-by-side pour-overs highlighting Africa, Central America, and volcanic Sumatra.",
    includes: [
      "1x Ethiopian Yirgacheffe G1 (Floral & Jasmine)",
      "1x Panama Boquete Geisha (Bergamot & Wild Honey)",
      "1x Colombian Huila Micro-Lot (Caramel & Red Apple)",
      "Custom NS Ceramic Cupping Spoon & Sensory Palette Card",
    ],
    pairingNotes: "Designed for guided side-by-side comparative cupping according to SCA competition standards.",
    accentColor: "#ffd8b6",
  },
  {
    id: "combo-reserve-pack",
    number: "03",
    name: "The Barista Reserve & Home Tin",
    subtitle: "Sip Today, Brew Tomorrow",
    badge: "Limited Roastery Edition",
    discount: "Save 26%",
    price: 34.00,
    originalPrice: 46.00,
    description: "Enjoy two chilled Nitro Cascara Cold Brews on tap today, and take home an airtight nitrogen-flushed 250g tin of yesterday's fresh drum roast.",
    includes: [
      "2x Nitro Cascara Botanical Cold Brews on Tap",
      "1x 250g Whole Bean Nitrogen-Flushed Roaster Tin",
      "Barista Grind Customization (Espresso, V60, AeroPress, or Whole)",
      "NS Coffee Matte Ceramic Collector Keychain",
    ],
    pairingNotes: "Peak flavor extraction window: 48 hours to 21 days from roast date stamped on base.",
    accentColor: "#ff9262",
  },
];
