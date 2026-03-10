import type { Category } from "./categories.api";

export const getCategoriesServer = async (): Promise<{ data: Category[] }> => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/meal-categories?populate=*`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};