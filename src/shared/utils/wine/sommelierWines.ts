import type { SommelierWine } from "./wineRules";
import type { WineType } from "./wineRules";

export const WINE_TYPE_LABEL: Record<WineType, string> = {
  red: "Red Wines",
  white: "White Wines",
  rose: "Rosé Wines",
  sparkling: "Sparkling",
  dessert: "Dessert Wines",
};

export const WINE_TYPE_ICON: Record<WineType, string> = {
  red: "/icons/wine-red.svg",
  white: "/icons/wine-white.svg",
  rose: "/icons/wine-rose.svg",
  sparkling: "/icons/wine-sparkling.svg",
  dessert: "/icons/wine-dessert.svg",
};

export const sommelierWines: SommelierWine[] = [
  // Red
  { name: "Cabernet Sauvignon", profile: { type: "red", body: "full",   sweetness: "dry",      acidity: "medium" } },
  { name: "Merlot",             profile: { type: "red", body: "medium", sweetness: "dry",      acidity: "medium" } },
  { name: "Pinot Noir",         profile: { type: "red", body: "light",  sweetness: "dry",      acidity: "medium" } },
  { name: "Syrah / Shiraz",     profile: { type: "red", body: "full",   sweetness: "dry",      acidity: "medium" } },
  { name: "Malbec",             profile: { type: "red", body: "full",   sweetness: "dry",      acidity: "medium" } },

  // White
  { name: "Chardonnay",         profile: { type: "white", body: "medium", sweetness: "dry",      acidity: "medium" } },
  { name: "Sauvignon Blanc",    profile: { type: "white", body: "light",  sweetness: "dry",      acidity: "high"   } },
  { name: "Riesling",           profile: { type: "white", body: "light",  sweetness: "semi-dry", acidity: "high"   } },
  { name: "Pinot Grigio",       profile: { type: "white", body: "light",  sweetness: "dry",      acidity: "medium" } },
  { name: "Chenin Blanc",       profile: { type: "white", body: "light",  sweetness: "semi-dry", acidity: "medium" } },

  // Rosé
  { name: "Provence Rosé",      profile: { type: "rose", body: "light",  sweetness: "dry",      acidity: "medium" } },
  { name: "White Zinfandel",    profile: { type: "rose", body: "light",  sweetness: "semi-dry", acidity: "low"    } },

  // Sparkling
  { name: "Champagne",          profile: { type: "sparkling", body: "light", sweetness: "dry",      acidity: "high"   } },
  { name: "Prosecco",           profile: { type: "sparkling", body: "light", sweetness: "semi-dry", acidity: "medium" } },
  { name: "Cava",               profile: { type: "sparkling", body: "light", sweetness: "dry",      acidity: "high"   } },

  // Dessert
  { name: "Sauternes",          profile: { type: "dessert", body: "medium", sweetness: "sweet", acidity: "high"   } },
  { name: "Port",               profile: { type: "dessert", body: "full",   sweetness: "sweet", acidity: "low"    } },
  { name: "Moscato",            profile: { type: "dessert", body: "light",  sweetness: "sweet", acidity: "medium" } },
];
