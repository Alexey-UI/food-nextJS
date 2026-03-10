"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/shared/api/favorites.api";

import { getToken } from "@/lib/auth/authStorage";

export const useFavorites = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const [loadingId, setLoadingId] = useState<number | undefined>();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(token as string),
    enabled: !!token,
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (recipeId: number) => {
      const current = favoritesQuery.data ?? [];
      const isFavorite = current.includes(recipeId);

      if (isFavorite) {
        await removeFavorite(recipeId, token || undefined);
      } else {
        await addFavorite(recipeId, token || undefined);
      }

      return recipeId;
    },

    onMutate: async (recipeId: number) => {
      setLoadingId(recipeId);

      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites =
        queryClient.getQueryData<number[]>(["favorites"]) ?? [];

      const isFavorite = previousFavorites.includes(recipeId);

      const newFavorites = isFavorite
        ? previousFavorites.filter((id) => id !== recipeId)
        : [...previousFavorites, recipeId];

      queryClient.setQueryData(["favorites"], newFavorites);

      return { previousFavorites };
    },

    onError: (_err, _recipeId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites);
      }
    },

    onSettled: () => {
      setLoadingId(undefined);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  return {
    favorites: favoritesQuery.data ?? [],
    toggleFavorite: toggleFavoriteMutation.mutate,
    loadingId,
    isLoading: favoritesQuery.isLoading,
  };
};