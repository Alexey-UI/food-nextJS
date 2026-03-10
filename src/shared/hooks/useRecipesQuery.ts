"use client";

import {useCallback, useMemo} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getRecipes } from "@/shared/api/recipes.api";
import {recipesKeys} from "@/shared/queryKeys";


export const useRecipesQuery = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSize = Number(searchParams.get("pageSize")) || 9;

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || undefined;
  const categoryId = searchParams.get("categoryId")
    ? Number(searchParams.get("categoryId"))
    : undefined;

  const query = useQuery({
    queryKey: recipesKeys.list(page, pageSize, search, categoryId),
    queryFn: () =>
      getRecipes({
        page,
        limit: pageSize,
        search,
        categoryId,
      }),
    placeholderData: (prev) => prev,
  });

  const total = query.data?.meta.pagination.total ?? 0;

  const totalPages = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const updateParams = useCallback((newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    params.set("page", "1");

    router.push(`?${params.toString()}`);
  }, [router, searchParams])

  const changePage = useCallback((newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));

    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return {
    recipes: query.data?.data ?? [],
    isLoading: query.isLoading,
    page,
    totalPages,
    changePage,
    updateParams,
  };
};