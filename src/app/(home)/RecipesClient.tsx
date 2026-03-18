"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.scss";

import CategorySelect from "@/components/CategorySelect";
import Hero from "@/components/Hero";
import RecipesSlider from "@/components/RecipesSlider";
import SearchBar from "@/components/SearchBar";

import {useRecipesQuery} from "@/shared/hooks/useRecipesQuery";
import {useResponsivePageSize} from "@/shared/hooks/useResponsivePageSize";
import {useFavorites} from "@/shared/hooks/useFavorites";
import type {RecipeListItem} from "@/shared/api/types";
import {flyToFavorites} from "@/shared/animations/flyToFavorites";
import {useAuth} from "@/lib/auth/AuthContext";


export default function RecipesClient({ token }: { token: string | null }) {
  const router = useRouter();
  useResponsivePageSize();

  const recipesState = useRecipesQuery();
  const favoritesState = useFavorites(token);
  const { isAuthenticated } = useAuth();

  const handleToggleFavorite = (recipe: RecipeListItem, element: Element) => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    if (!favoritesState.favorites.includes(recipe.id)) {
      flyToFavorites(element);
    }
    favoritesState.toggleFavorite(recipe);
  };

  return (
    <>
      <Hero />

      <main>
        <div className="container">
          <div className={styles.slogan}>
            Find the perfect food and{" "}
            <Link href="/?categoryId=21" className={styles.underlined}>drink ideas</Link> for every
            occasion
          </div>

          <div className={styles.recipes__wrapper}>
            <SearchBar updateParams={recipesState.updateParams} />
            <CategorySelect updateParams={recipesState.updateParams} />
          </div>

          <RecipesSlider
            {...recipesState}
            favorites={favoritesState.favorites}
            toggleFavorite={handleToggleFavorite}
            loadingId={favoritesState.loadingId}
          />
        </div>
      </main>
    </>
  );
}