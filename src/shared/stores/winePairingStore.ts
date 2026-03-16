import { makeAutoObservable } from "mobx";
import { getRecipes } from "@/shared/api/recipes.api";
import { scoreRecipe } from "@/shared/utils/wine/scoreRecipe";

import type { WineProfile, SommelierWine } from "@/shared/utils/wine/wineRules";
import type { RecipeListItem } from "@/shared/api/types";

const DEFAULT_PROFILE: WineProfile = {
  type: "red",
  body: "medium",
  sweetness: "dry",
  acidity: "medium",
};

export class WinePairingStore {
  selectedWine: SommelierWine | null = null;
  profile: WineProfile = DEFAULT_PROFILE;

  recipes: RecipeListItem[] = [];
  loading = false;
  searched = false;

  constructor() {
    makeAutoObservable(this);
  }

  selectWine = (wine: SommelierWine) => {
    this.selectedWine = wine;
    this.profile = wine.profile;
  }

  changeProfile = (patch: Partial<WineProfile>) => {
    this.selectedWine = null;
    this.profile = { ...this.profile, ...patch };
  }

  findRecipes = async () => {
    this.loading = true;
    this.searched = true;

    try {
      const response = await getRecipes({ limit: 100 });

      const best = response.data
        .map((recipe) => ({
          recipe,
          score: scoreRecipe(this.profile, recipe) + Math.random() * 1.5,
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((r) => r.recipe);

      this.recipes = best;
    } finally {
      this.loading = false;
    }
  }
}
