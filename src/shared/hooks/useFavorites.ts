"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/shared/api/favorites.api";

import type { RecipeListItem } from "@/shared/api/types";

export const useFavorites = (token: string | null) => {
  const queryClient = useQueryClient();
  const [loadingId, setLoadingId] = useState<number | undefined>();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", token],
    queryFn: () => getFavorites(token as string),
    enabled: !!token,
    select: (data: RecipeListItem[]) => ({
      recipes: data,
      ids: data.map((r) => r.id),
    }),
  });

  const favoriteRecipes = favoritesQuery.data?.recipes ?? [];
  const favorites = favoritesQuery.data?.ids ?? [];

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (recipe: RecipeListItem) => {
      const current: RecipeListItem[] = favoriteRecipes ?? [];
      const isFavorite = current.some((r) => r.id === recipe.id);

      if (isFavorite) {
        await removeFavorite(recipe.id, token || undefined);
      } else {
        await addFavorite(recipe.id, token || undefined);
      }

      return recipe;
    },

    onMutate: async (recipe: RecipeListItem) => {
      setLoadingId(recipe.id);

      await queryClient.cancelQueries({ queryKey: ["favorites", token] });

      const previousFavorites =
        queryClient.getQueryData<RecipeListItem[]>(["favorites", token]) ?? [];

      const isFavorite = previousFavorites.some((r) => r.id === recipe.id);

      const newFavorites = isFavorite
        ? previousFavorites.filter((r) => r.id !== recipe.id)
        : [...previousFavorites, recipe];

      queryClient.setQueryData(["favorites", token], newFavorites);

      return { previousFavorites };
    },

    onError: (_err, _recipe, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          ["favorites", token],
          context.previousFavorites
        );
      }
    },

    onSettled: () => {
      setLoadingId(undefined);

      queryClient.invalidateQueries({
        queryKey: ["favorites", token],
      });
    },
  });

  return {
    favorites,
    favoriteRecipes,
    toggleFavorite: toggleFavoriteMutation.mutate,
    loadingId,
    isLoading: favoritesQuery.isLoading,
  };
};
