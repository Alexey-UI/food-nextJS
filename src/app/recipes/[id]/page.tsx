import { notFound } from "next/navigation";

import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {recipeKeys} from "@/shared/queryKeys";
import RecipeClient from "@/app/recipes/[id]/RecipeClient";
import {getRecipeByDocumentIdServer} from "@/shared/api/recipes.server";


export default async function RecipePage({params}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getRecipeByDocumentIdServer(id),
  });

  const recipe = queryClient.getQueryData(recipeKeys.detail(id));

  if (!recipe) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecipeClient id={id} />
    </HydrationBoundary>
  );
}