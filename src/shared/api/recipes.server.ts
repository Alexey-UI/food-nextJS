import { buildRecipesQuery } from "./utils/buildRecipesQuery";
import type {RecipeDetails, RecipesResponse} from "./types";
import {GetRecipesParams} from "@/shared/api/recipes.api";
import qs from "qs";

export const getPantryRecipesServer = async (): Promise<RecipesResponse> => {
  const query = qs.stringify(
    {
      populate: ["images", "category", "ingradients"],
      pagination: { page: 1, pageSize: 100 },
    },
    { skipNulls: true }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes?${query}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch pantry recipes");

  return res.json();
};

export const getRecipesServer = async (
  params: GetRecipesParams
): Promise<RecipesResponse> => {

  const query = buildRecipesQuery(params);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes?${query}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return res.json();
};

export const getRecipeByDocumentIdServer = async (
  documentId: string
): Promise<{ data: RecipeDetails }> => {

  const query = qs.stringify(
    {
      populate: [
        "ingradients",
        "equipments",
        "directions",
        "images",
        "category",
      ],
    },
    { skipNulls: true }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recipes/${documentId}?${query}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return { data: null as unknown as RecipeDetails };
  }

  return res.json();
};