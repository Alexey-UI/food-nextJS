import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getServerToken } from "@/lib/auth/getServerToken";
import { getPantryRecipesServer } from "@/shared/api/recipes.server";
import { getFavoritesServer } from "@/shared/api/favorites.server";

import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const token = await getServerToken();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["recipes-pantry"],
    queryFn: () => getPantryRecipesServer(),
    staleTime: 60 * 1000,
  });

  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["favorites", token],
      queryFn: () => getFavoritesServer(token),
      staleTime: 60 * 1000,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsClient token={token} />
    </HydrationBoundary>
  );
}
