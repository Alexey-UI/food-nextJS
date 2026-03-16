import type { RecipeListItem } from "@/shared/api/types";

export type MatchTier = "perfect" | "almost" | "partial";

export type MatchedRecipe = {
  recipe: RecipeListItem;
  matchedCount: number;
  totalCount: number;
  tier: MatchTier;
};

export function extractIngredients(recipes: RecipeListItem[]): string[] {
  const seen = new Set<string>();
  for (const recipe of recipes) {
    for (const ing of recipe.ingradients ?? []) {
      if (ing.name) seen.add(ing.name.trim());
    }
  }
  return Array.from(seen).sort((a, b) => a.localeCompare(b));
}

export function matchRecipes(
  recipes: RecipeListItem[],
  selected: Set<string>
): MatchedRecipe[] {
  if (selected.size === 0) return [];

  const results: MatchedRecipe[] = [];

  for (const recipe of recipes) {
    const names = (recipe.ingradients ?? []).map((i) => i.name.trim());
    const matchedCount = names.filter((n) => selected.has(n)).length;
    if (matchedCount === 0) continue;

    const totalCount = names.length;
    const ratio = totalCount > 0 ? matchedCount / totalCount : 0;

    let tier: MatchTier;
    if (matchedCount === totalCount) {
      tier = "perfect";
    } else if (ratio >= 0.7) {
      tier = "almost";
    } else {
      tier = "partial";
    }

    results.push({ recipe, matchedCount, totalCount, tier });
  }

  return results.sort((a, b) => b.matchedCount / b.totalCount - a.matchedCount / a.totalCount);
}
