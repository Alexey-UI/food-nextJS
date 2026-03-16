export type WineType =
  | "red"
  | "white"
  | "rose"
  | "sparkling"
  | "dessert";

export type WineProfile = {
  type: WineType;
  body: "light" | "medium" | "full";
  sweetness: "dry" | "semi-dry" | "sweet";
  acidity: "low" | "medium" | "high";
};

export type SommelierWine = {
  name: string;
  profile: WineProfile;
};


export const wineCategoryRules: Record<WineType, string[]> = {
  red: [
    "Beef",
    "Steak",
    "Pasta",
    "BBQ",
    "Lamb"
  ],

  white: [
    "Seafood",
    "Fish",
    "Chicken",
    "Salad"
  ],

  rose: [
    "Salad",
    "Pasta",
    "Chicken"
  ],

  sparkling: [
    "Appetizer",
    "Salad"
  ],

  dessert: [
    "Dessert"
  ]
};

export const ingredientWineMap: Record<string, WineType> = {
  beef: "red",
  lamb: "red",
  pork: "red",
  steak: "red",
  mushroom: "red",

  salmon: "white",
  shrimp: "white",
  fish: "white",
  tuna: "white",
  chicken: "white",

  cheese: "rose",

  chocolate: "dessert",
  cake: "dessert"
};