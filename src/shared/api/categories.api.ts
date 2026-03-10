import { axiosInstance } from '../../lib/axiosInstance';

export type Category = {
  id: number;
  title: string;
};

export const getCategories = async (): Promise<{ data: Category[] }> => {
  const { data } = await axiosInstance.get('/meal-categories?populate=*');
  return data;
};
