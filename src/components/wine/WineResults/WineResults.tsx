import type { RecipeListItem } from "@/shared/api/types";
import RecipeCard from "@/components/RecipeCard";
import styles from "./WineResults.module.scss";

type Props = {
  recipes: RecipeListItem[];
  favorites: number[];
  toggleFavorite: (recipe: RecipeListItem) => void;
  loadingId?: number;
};

export default function WineResults({ recipes, favorites, toggleFavorite, loadingId }: Props) {
  if (!recipes.length) return (
    <p className={styles.empty}>No matching dishes found. Try a different wine profile.</p>
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Best dishes for your wine</h2>

      <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            toggleFavorite={toggleFavorite}
            favoriteLoading={loadingId === recipe.id}
          />
        ))}
      </div>
    </section>
  );
}
