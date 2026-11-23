export interface CoffeeItem {
  id: string;
  name: string;
  subtitle: string;
  category: "all" | "single-origin" | "cold-drip" | "espresso" | "signature";
  categoryLabel: string;
  price: number;
  roastLevel: "Light" | "Medium" | "Medium-Dark" | "Dark";
  origin: string;
  elevation: string;
  process: string;
  tastingNotes: string[];
  ratings: {
    acidity: number; // 1 to 5
    body: number;    // 1 to 5
    sweetness: number; // 1 to 5
    aroma: number;   // 1 to 5
  };
  badge?: string;
  description: string;
}

export const COFFEE_CATALOG: CoffeeItem[] = [
  {
    id: "ethiopian-yirgacheffe",
    name: "Ethiopian Yirgacheffe G1",
    subtitle: "Washed Heirloom Micro-Lot",
    category: "single-origin",
    categoryLabel: "Single Origin",
    price: 6.50,
    roastLevel: "Light",
    origin: "Gedeo Zone, Ethiopia",
    elevation: "2,150 MASL",
    process: "Washed & Sun-Dried on Raised Beds",
    tastingNotes: ["Jasmine Blossom", "Candied Bergamot", "White Peach", "Wild Honey"],
    ratings: {
      acidity: 5,
      body: 3,
      sweetness: 5,
      aroma: 5,
    },
    badge: "Barista's #1 Pick",
    description: "Our signature pour-over jewel. Delicate floral aromas that open into shimmering citrus brightness with an ultra-clean honeyed finish.",
  },
  {
    id: "kyoto-cold-drip",
    name: "Kyoto 16-Hour Cold Drip",
    subtitle: "Dutch Slow Tower Extraction",
    category: "cold-drip",
    categoryLabel: "Cold Drip",
    price: 7.25,
    roastLevel: "Medium",
    origin: "Antioquia, Colombia",
    elevation: "1,950 MASL",
    process: "1 Drop Per Second Cold Vacuum",
    tastingNotes: ["Dutch Cacao", "Bourbon Oak", "Black Cherry", "Dark Molasses"],
    ratings: {
      acidity: 2,
      body: 5,
      sweetness: 4,
      aroma: 4,
    },
    badge: "Limited Daily Batch",
    description: "Brewed drop-by-single-drop over 16 continuous hours in glass architectural towers. Whiskey-smooth body with zero bitterness and deep cacao liqueur notes.",
  },
  {
    id: "smoked-cortado",
    name: "Spanish Smoked Cortado",
    subtitle: "Equal Parts Espresso & Steamed Velvet",
    category: "espresso",
    categoryLabel: "Espresso Craft",
    price: 5.75,
    roastLevel: "Medium-Dark",
    origin: "Huehuetenango, Guatemala",
    elevation: "1,800 MASL",
    process: "Double Ristretto + Smoked Bean Infusion",
    tastingNotes: ["Smoked Vanilla", "Roasted Hazelnut", "Caramelized Brown Sugar", "Oak Smoke"],
    ratings: {
      acidity: 3,
      body: 4,
      sweetness: 4,
      aroma: 5,
    },
    badge: "House Classic",
    description: "A 1:1 balance of intense 9-bar ristretto cut with textured warm oat milk, kissed by charred hickory smoke and whole Madagascar vanilla bean.",
  },
  {
    id: "pistachio-cappuccino",
    name: "Velvet Pistachio Cappuccino",
    subtitle: "Artisanal Bronte Emulsion",
    category: "signature",
    categoryLabel: "Signature Craft",
    price: 6.85,
    roastLevel: "Medium",
    origin: "Cerrado Mineiro, Brazil",
    elevation: "1,150 MASL",
    process: "Natural Anaerobic Fermentation",
    tastingNotes: ["Sicilian Pistachio", "Salted Butter Caramel", "Dark Chocolate Shavings"],
    ratings: {
      acidity: 2,
      body: 5,
      sweetness: 5,
      aroma: 4,
    },
    badge: "Fan Favorite",
    description: "Pure Sicilian pistachio butter swirled into double espresso and folded into micro-foamed silk. Dusted with freshly roasted pistachio crumble.",
  },
  {
    id: "nitro-cascara-tonic",
    name: "Nitro Cascara Botanical Tonic",
    subtitle: "Sun-Dried Coffee Cherry & Citrus",
    category: "cold-drip",
    categoryLabel: "Botanical Cold",
    price: 6.50,
    roastLevel: "Light",
    origin: "Boquete, Panama",
    elevation: "1,750 MASL",
    process: "Cascara Cold Maceration",
    tastingNotes: ["Hibiscus", "Rosehip", "Meyer Lemon Zest", "Pomegranate"],
    ratings: {
      acidity: 4,
      body: 2,
      sweetness: 4,
      aroma: 5,
    },
    badge: "Ultra Refreshing",
    description: "Brewed from the sun-dried fruit skins (cascara) of Geisha coffee cherries, charged with micro-nitrogen and layered over craft botanical tonic.",
  },
  {
    id: "midnight-sumatra",
    name: "Midnight Sumatra Mandheling",
    subtitle: "Volcanic Wet-Hulled Dark Reserve",
    category: "single-origin",
    categoryLabel: "Dark Reserve",
    price: 6.25,
    roastLevel: "Dark",
    origin: "Lake Toba, North Sumatra",
    elevation: "1,600 MASL",
    process: "Traditional Giling Basah",
    tastingNotes: ["Raw Dark Cacao 85%", "Cedar Wood", "Earthy Spice", "Pipe Tobacco"],
    ratings: {
      acidity: 1,
      body: 5,
      sweetness: 3,
      aroma: 4,
    },
    badge: "Bold & Intense",
    description: "For lovers of profound depth. Massive velvety syrupy mouthfeel, zero astringency, and resonant notes of volcanic cedar and bittersweet dark chocolate.",
  },
];
