import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getServerToken } from "@/lib/auth/getServerToken";
import { getFavoritesServer } from "@/shared/api/favorites.server";

import FavoritesClient from "./FavoritesClient";

export default async function FavoritesPage() {
  const token = await getServerToken();

  const queryClient = new QueryClient();

  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["favorites", token],
      queryFn: () => getFavoritesServer(token),
      staleTime: 60 * 1000,
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavoritesClient token={token} />
    </HydrationBoundary>
  );
}
