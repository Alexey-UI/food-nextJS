"use client";

import { useRecipeQuery } from "@/shared/hooks/useRecipeQuery";

import RecipeHero from "@/components/RecipeHero";
import RecipeSummary from "@/components/RecipeSummary";
import RecipeDetails from "@/components/RecipeDetails";
import RecipeDirections from "@/components/RecipeDirections";

type Props = {
  id: string;
};

export default function RecipeClient({ id }: Props) {
  const { data } = useRecipeQuery(id);

  const recipe = data?.data;

  if (!recipe) return null;

  const imageUrl = recipe.images?.[0]?.formats?.medium?.url;

  return (
    <div className="container">
      <RecipeHero
        name={recipe.name}
        imageUrl={imageUrl}
        preparationTime={recipe.preparationTime}
        cookingTime={recipe.cookingTime}
        likes={recipe.likes}
        servings={recipe.servings}
        rating={recipe.rating}
      />

      <RecipeSummary summary={recipe.summary} />

      <RecipeDetails
        ingradients={recipe.ingradients}
        equipment={recipe.equipments}
      />

      <RecipeDirections directions={recipe.directions} />
    </div>
  );
}