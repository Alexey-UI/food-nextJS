import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/shared/api/categories.api';

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
};