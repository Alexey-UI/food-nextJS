import qs from 'qs';

import { axiosInstance } from '@/lib/axiosInstance';
import type {RecipeDetails, RecipesResponse} from './types';
import {buildRecipesQuery} from "@/shared/api/utils/buildRecipesQuery";

export type GetRecipesParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
};

export const getRecipes = async (
  params: GetRecipesParams
): Promise<RecipesResponse> => {

  const query = buildRecipesQuery(params);

  const { data } = await axiosInstance.get(`/recipes?${query}`);

  return data;
};

export const getPantryRecipes = async (): Promise<RecipesResponse> => {
  const query = qs.stringify(
    {
      populate: ["images", "category", "ingradients"],
      pagination: { page: 1, pageSize: 100 },
    },
    { skipNulls: true }
  );

  const { data } = await axiosInstance.get(`/recipes?${query}`);
  return data;
};

export const getRecipeByDocumentId = async (
  documentId: string | Array<string>
): Promise<{ data: RecipeDetails }> => {
  const query = qs.stringify(
    {
      populate: ['ingradients', 'equipments', 'directions', 'images', 'category'],
    },
    { skipNulls: true }
  );

  const { data } = await axiosInstance.get(`/recipes/${documentId}?${query}`);

  return data;
};
