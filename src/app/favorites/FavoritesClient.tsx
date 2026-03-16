"use client";

import { useFavorites } from "@/shared/hooks/useFavorites";
import VirtualizedFavoritesList from "@/components/VirtualizedFavoritesList";
import { flyToFavorites } from "@/shared/animations/flyToFavorites";
import type { RecipeListItem } from "@/shared/api/types";

import styles from "./FavoritesPage.module.scss";

const FavoritesClient = ({ token }: { token: string | null }) => {
  const { favoriteRecipes, favorites, toggleFavorite, loadingId, isLoading } =
    useFavorites(token);

  const handleToggleFavorite = (recipe: RecipeListItem, element: Element) => {
    if (!favorites.includes(recipe.id)) {
      flyToFavorites(element);
    }
    toggleFavorite(recipe);
  };

  return (
    <main>
      <div className="container">
        <h1 className={styles.title}>My Favorites</h1>

        <VirtualizedFavoritesList
          recipes={favoriteRecipes}
          favorites={favorites}
          toggleFavorite={handleToggleFavorite}
          loadingId={loadingId}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default FavoritesClient;
