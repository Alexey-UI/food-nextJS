import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import RecipesClient from "./RecipesClient";
import { getRecipesServer } from "@/shared/api/recipes.server";
import { getFavoritesServer } from "@/shared/api/favorites.server";
import { getCategoriesServer } from "@/shared/api/categories.server";
import {getServerToken} from "@/lib/auth/getServerToken";
import {recipesKeys} from "@/shared/queryKeys";


type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categoryId?: string;
    pageSize?: string;
  }>;
};


export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const queryClient = new QueryClient();
  const token = getServerToken();

  const page = Number(params?.page) || 1;
  const search = params?.search;
  const categoryId = params?.categoryId
    ? Number(params.categoryId)
    : undefined;

  const pageSize = Number(params?.pageSize) || 9;

  const queries = [
    queryClient.prefetchQuery({
      queryKey: recipesKeys.list(page, pageSize, search, categoryId),
      queryFn: () =>
        getRecipesServer({
          page,
          limit: pageSize,
          search,
          categoryId,
        }),
      staleTime: 60 * 1000,
    }),

    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: () => getCategoriesServer(),
      staleTime: 60 * 1000,
    }),
  ];

  if (token) {
    queries.push(
      queryClient.prefetchQuery({
        queryKey: ["favorites"],
        queryFn: () => getFavoritesServer(token),
        staleTime: 60 * 1000,
      })
    );
  }

  await Promise.all(queries);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipesClient />
    </HydrationBoundary>
  );
}
