export type QueryObject = {
  populate: string[];
  pagination: {
    page: number;
    pageSize: number;
  };
  filters?: Record<string, unknown>;
};

export type RecipeIngredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

export type RecipeImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type RecipeImage = {
  id: number;
  formats?: {
    small?: RecipeImageFormat;
    medium?: RecipeImageFormat;
    thumbnail?: RecipeImageFormat;
  };
};

export type RecipeCategory = {
  id: number;
  title: string;
};

export type RecipeDirections = {
  id: number;
  description: string;
};

export type RecipeEquipments = {
  id: number;
  name: string;
};

export type RecipeListItem = {
  id: number;
  documentId: string;

  name: string;
  summary: string;
  calories: number;
  cookingTime: number;
  preparationTime: number;
  totalTime: number;
  rating: number;
  likes: number;

  images: RecipeImage[];
  ingradients: RecipeIngredient[];
  category: RecipeCategory;
};

export type RecipeForCat = Omit<
  RecipeListItem,
  "images" | "ingradients" | "category"
> & {
  length: number;
};

export type RecipeDetails = {
  directions: RecipeDirections[];
  equipments: RecipeEquipments[];
  servings: number;
} & RecipeListItem;

export type RecipesResponse = {
  data: RecipeListItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
};

export type ItemType = {
  id: number;
  recipe: RecipeListItem;
}
