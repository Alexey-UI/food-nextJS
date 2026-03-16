"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { getPantryRecipes } from "@/shared/api/recipes.api";
import { useFavorites } from "@/shared/hooks/useFavorites";
import RecipeCard from "@/components/RecipeCard";
import type { RecipeListItem } from "@/shared/api/types";
import { extractIngredients, matchRecipes } from "@/shared/utils/matchRecipes";
import type { MatchedRecipe, MatchTier } from "@/shared/utils/matchRecipes";
import { flyToFavorites } from "@/shared/animations/flyToFavorites";

import styles from "./Products.module.scss";

type Props = { token: string | null };

const TIER_LABEL: Record<MatchTier, string> = {
  perfect: "Perfect match",
  almost: "Almost there",
  partial: "Partial match",
};

const TIER_ORDER: MatchTier[] = ["perfect", "almost", "partial"];

export default function ProductsClient({ token }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { data } = useQuery({
    queryKey: ["recipes-pantry"],
    queryFn: () => getPantryRecipes(),
    staleTime: 60 * 1000,
  });

  const { favorites, toggleFavorite, loadingId } = useFavorites(token);

  const recipes = useMemo(() => data?.data ?? [], [data]);

  const ingredients = useMemo(() => extractIngredients(recipes), [recipes]);

  const matches = useMemo(
    () => matchRecipes(recipes, selected),
    [recipes, selected]
  );

  const grouped = useMemo(() => {
    const map: Partial<Record<MatchTier, MatchedRecipe[]>> = {};
    for (const m of matches) {
      (map[m.tier] ??= []).push(m);
    }
    return map;
  }, [matches]);

  const toggle = useCallback((name: string) => {
    setSelected((prev) => {
      const next = new Set(prev);

      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }

      return next;
    });
  }, []);

  const handleToggleFavorite = useCallback(
    (recipe: RecipeListItem, element: Element) => {
      if (!token) {
        router.push("/login");
        return;
      }
      if (!favorites.includes(recipe.id)) {
        flyToFavorites(element);
      }
      toggleFavorite(recipe);
    },
    [token, toggleFavorite, favorites, router]
  );

  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className={styles.title}>Pantry Matcher</h1>
          <p className={styles.subtitle}>
            Select ingredients you have — we&apos;ll find what you can cook
          </p>
        </div>

        <section className={styles.ingredientsSection}>
          <div className={styles.ingredientsHeader}>
            <h2 className={styles.sectionHeading}>Your ingredients</h2>
            {selected.size > 0 && (
              <button
                className={styles.clearBtn}
                onClick={() => setSelected(new Set())}
              >
                Clear selection ({selected.size})
              </button>
            )}
          </div>

          <div className={styles.chips}>
            {ingredients.map((name) => (
              <button
                key={name}
                className={classNames(styles.chip, {
                  [styles.chipActive]: selected.has(name),
                })}
                onClick={() => toggle(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </section>

        {selected.size > 0 && matches.length === 0 && (
          <p className={styles.empty}>
            No recipes found for selected ingredients. Try adding more.
          </p>
        )}

        {TIER_ORDER.map((tier) => {
          const group = grouped[tier];
          if (!group?.length) return null;
          return (
            <section key={tier} className={styles.resultsSection}>
              <h2 className={classNames(styles.sectionHeading, styles[`tier--${tier}`])}>
                {TIER_LABEL[tier]}
                <span className={styles.tierCount}>{group.length}</span>
              </h2>
              <div className={styles.grid}>
                {group.map(({ recipe, matchedCount, totalCount }) => (
                  <div key={recipe.id} className={styles.cardWrapper}>
                    <span className={classNames(styles.badge, styles[`badge--${tier}`])}>
                      {matchedCount} / {totalCount} ingredients
                    </span>
                    <RecipeCard
                      className={styles.recipeCard}
                      recipe={recipe}
                      isFavorite={favorites.includes(recipe.id)}
                      toggleFavorite={handleToggleFavorite}
                      favoriteLoading={loadingId === recipe.id}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
