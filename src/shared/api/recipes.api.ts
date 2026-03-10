import qs from 'qs';

import { axiosInstance } from '../../lib/axiosInstance';
import type {RecipeDetails, RecipesResponse, QueryObject} from './types';

export type GetRecipesParams = {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
};

export const getRecipes = async (
  params: GetRecipesParams
): Promise<RecipesResponse> => {
  const queryObject: QueryObject = {
    populate: ['images', 'category'],
    pagination: {
      page: params.page ?? 1,
      pageSize: params.limit ?? 9,
    },
  };

  const filters: Record<string, unknown> = {};

  if (params.search) {
    filters.name = {
      $containsi: params.search,
    };
  }

  if (params.categoryId) {
    filters.category = {
      id: {
        $eq: params.categoryId,
      },
    };
  }

  if (Object.keys(filters).length > 0) {
    queryObject.filters = filters;
  }
  const query = qs.stringify(queryObject, { skipNulls: true });

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
