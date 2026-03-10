import { notFound } from "next/navigation";

import { getRecipeByDocumentId } from "@/shared/api/recipes.api";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {recipeKeys} from "@/shared/queryKeys";
import RecipeClient from "@/app/recipes/[id]/RecipeClient";


export default async function RecipePage({params}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => getRecipeByDocumentId(id),
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