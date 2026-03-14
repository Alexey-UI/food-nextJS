import { axiosInstance } from '@/lib/axiosInstance';
import {RecipeForCat, RecipeImage} from "@/shared/api/types";

export type Category = {
  id: number;
  title: string;
  image: RecipeImage;
  recipes: RecipeForCat,
};

export const getCategories = async (): Promise<{ data: Category[] }> => {
  const { data } = await axiosInstance.get('/meal-categories?populate=*');
  return data;
};
