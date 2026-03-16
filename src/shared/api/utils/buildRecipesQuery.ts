import qs from "qs";
import type { QueryObject } from "../types";
import type { GetRecipesParams } from "../recipes.api";

export const buildRecipesQuery = (params: GetRecipesParams) => {
  const queryObject: QueryObject = {
    populate: ["images", "category", "ingradients"],
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
      id: { $eq: params.categoryId },
    };
  }

  if (Object.keys(filters).length) {
    queryObject.filters = filters;
  }

  return qs.stringify(queryObject, { skipNulls: true });
};