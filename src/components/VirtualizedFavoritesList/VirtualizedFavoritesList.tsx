"use client";

import {useRef, useMemo} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";

import RecipeCard from "@/components/RecipeCard/RecipeCard";
import type {RecipeListItem} from "@/shared/api/types";

import styles from "./VirtualizedFavoritesList.module.scss";

type Props = {
  recipes: RecipeListItem[];
  favorites: number[];
  toggleFavorite: (recipe: RecipeListItem, element: Element) => void;
  loadingId?: number;
  isLoading: boolean;
};

const CARD_HEIGHT = 520;
const GAP = 64;

const VirtualizedFavoritesList = (
  {
    recipes,
    favorites,
    toggleFavorite,
    loadingId,
    isLoading,
  }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const columns =
    typeof window !== "undefined"
      ? window.innerWidth < 640
        ? 1
        : window.innerWidth < 1124
          ? 2
          : 3
      : 3;

  const rowCount = Math.ceil(recipes.length / columns);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => CARD_HEIGHT + GAP,
    overscan: 4,
  });

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <>

      <div
        ref={parentRef}
        className={styles.desktopScroll}
      >
        <div
          className={styles.inner}
          style={{
            height: virtualizer.getTotalSize(),
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const start = virtualRow.index * columns;
            const items = recipes.slice(start, start + columns);

            return (
              <div
                key={virtualRow.index}
                className={styles.row}
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {items.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoritesSet.has(recipe.id)}
                    toggleFavorite={toggleFavorite}
                    favoriteLoading={loadingId === recipe.id}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>


      <div className={styles.mobileSlider}>
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className={styles.slide}
          >
            <RecipeCard
              recipe={recipe}
              isFavorite={favoritesSet.has(recipe.id)}
              toggleFavorite={toggleFavorite}
              favoriteLoading={loadingId === recipe.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default VirtualizedFavoritesList;
