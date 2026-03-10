"use client";

import styles from "./page.module.css";

import CategorySelect from "@/components/CategorySelect";
import Hero from "@/components/Hero";
import RecipesSlider from "@/components/RecipesSlider";
import SearchBar from "@/components/SearchBar";

import {useRecipesQuery} from "@/shared/hooks/useRecipesQuery";
import {useResponsivePageSize} from "@/shared/hooks/useResponsivePageSize";
import {useFavorites} from "@/shared/hooks/useFavorites";


export default function RecipesClient() {
  useResponsivePageSize();

  const recipesState = useRecipesQuery();
  const favoritesState = useFavorites();

  return (
    <>
      <Hero />

      <main>
        <div className="container">
          <div className={styles.slogan}>
            Find the perfect food and{" "}
            <span className={styles.underlined}>drink ideas</span> for every
            occasion
          </div>

          <div className={styles.recipes__wrapper}>
            <SearchBar updateParams={recipesState.updateParams} />
            <CategorySelect updateParams={recipesState.updateParams} />
          </div>

          <RecipesSlider
            {...recipesState}
            favorites={favoritesState.favorites}
            toggleFavorite={favoritesState.toggleFavorite}
            loadingId={favoritesState.loadingId}
          />
        </div>
      </main>
    </>
  );
}