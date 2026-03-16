import styles from "./RecipesSlider.module.scss";
import RecipeCard from "../RecipeCard/RecipeCard";

import Pagination from "@/components/Pagination";
import type {RecipeListItem} from "@/shared/api/types";
import {useMemo} from "react";

type RecipesSliderProps = {
  recipes: RecipeListItem[];
  isLoading: boolean;
  page: number;
  totalPages: number;
  changePage: (page: number) => void;

  favorites: number[];
  toggleFavorite: (recipe: RecipeListItem, element: Element) => void;
  loadingId?: number;
};

const RecipesSlider = (
  {
    recipes,
    isLoading,
    page,
    totalPages,
    changePage,
    favorites,
    toggleFavorite,
    loadingId,
  }: RecipesSliderProps) => {
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loader}>Loading...</div>
      ) : (
        <>
          <div className={styles.grid}>
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoritesSet.has(recipe.id)}
                toggleFavorite={toggleFavorite}
                favoriteLoading={loadingId === recipe.id}
              />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages || 1}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
};

export default RecipesSlider;