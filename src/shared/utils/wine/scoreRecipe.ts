import type { RecipeListItem } from "@/shared/api/types";
import { ingredientWineMap, wineCategoryRules, WineProfile } from "./wineRules";

const HEAVY_INGREDIENTS = ["beef", "lamb", "steak", "pork"];
const FATTY_INGREDIENTS = ["salmon", "fish", "tuna", "cheese"];

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/);

export const scoreRecipe = (
  profile: WineProfile,
  recipe: RecipeListItem
): number => {
  let score = 0;

  if (recipe.rating) {
    score += recipe.rating * 1.5;
  }

  const category = recipe.category?.title;

  if (category && wineCategoryRules[profile.type]?.includes(category)) {
    score += 5;
  }

  const ingredients = recipe.ingradients ?? [];

  let matchedIngredient = false;

  for (const ing of ingredients) {
    const words = normalize(ing.name ?? "");

    for (const word of words) {
      const wineMatch = ingredientWineMap[word];

      if (wineMatch === profile.type && !matchedIngredient) {
        score += 6;
        matchedIngredient = true;
      }

      if (profile.body === "full" && HEAVY_INGREDIENTS.includes(word)) {
        score += 2;
      }

      if (profile.acidity === "high" && FATTY_INGREDIENTS.includes(word)) {
        score += 2;
      }
    }
  }

  if (profile.sweetness === "sweet" && category === "Dessert") {
    score += 4;
  }

  return score;
};