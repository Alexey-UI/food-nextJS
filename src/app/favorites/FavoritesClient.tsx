"use client";

import { useFavorites } from "@/shared/hooks/useFavorites";
import VirtualizedFavoritesList from "@/components/VirtualizedFavoritesList";

import styles from "./FavoritesPage.module.scss";

const FavoritesClient = ({ token }: { token: string | null }) => {
  const { favoriteRecipes, favorites, toggleFavorite, loadingId, isLoading } =
    useFavorites(token);

  return (
    <main>
      <div className="container">
        <h1 className={styles.title}>My Favorites</h1>

        <VirtualizedFavoritesList
          recipes={favoriteRecipes}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          loadingId={loadingId}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default FavoritesClient;
