"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipeByDocumentId } from "@/shared/api/recipes.api";
import { recipeKeys } from "@/shared/queryKeys";

export const useRecipeQuery = (id: string) => {
  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getRecipeByDocumentId(id),
  });
};