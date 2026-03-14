"use client";

import classNames from "classnames";
import React from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

import Text from "../Text";
import styles from "./RecipeCard.module.scss";

import Button from "@/components/Button";
import type {RecipeListItem} from "@/shared/api/types";

export type RecipeCardProps = {
  className?: string;
  recipe: RecipeListItem;
  isFavorite: boolean;
  toggleFavorite: (recipe: RecipeListItem) => void;
  favoriteLoading: boolean;
};

const RecipeCard = (
  {
    className,
    recipe,
    isFavorite,
    toggleFavorite,
    favoriteLoading,
  }: RecipeCardProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/recipes/${recipe.documentId}`);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (favoriteLoading) return;

    toggleFavorite(recipe);
  };

  const imageUrl =
    recipe.images?.[0]?.formats?.small?.url || "/placeholder.jpg";

  const ingredientsString = recipe.ingradients
    ?.map((i) => i.name)
    .join(" + ");

  return (
    <div
      className={classNames(styles.card, className)}
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleNavigate();
      }}
    >
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={recipe.name}
          width={300}
          height={200}
        />
      </div>

      <div className={styles.body}>
        {recipe.cookingTime && (
          <Text
            className={styles.cardText}
            weight="medium"
            view="p-14"
            color="secondary"
          >
            <span>{recipe.cookingTime} minutes</span>
          </Text>
        )}

        <Text
          className={styles.title}
          weight="medium"
          view="p-20"
          color="primary"
          maxLines={1}
        >
          {recipe.name}
        </Text>

        <Text
          className={styles.subtitle}
          weight="normal"
          view="p-16"
          color="secondary"
          maxLines={2}
        >
          {ingredientsString}
        </Text>
      </div>

      <div className={styles.footer}>
        {recipe.calories && (
          <Text
            className={styles.content}
            weight="bold"
            view="p-18"
            color="accent"
          >
            {recipe.calories} kcal
          </Text>
        )}

        <div className={styles.action}>
          <Button
            onClick={handleSaveClick}
            disabled={favoriteLoading}
          >
            {favoriteLoading
              ? "Saving..."
              : isFavorite
                ? "Saved"
                : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RecipeCard);
