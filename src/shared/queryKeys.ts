export const recipesKeys = {
  all: ["recipes"] as const,
  list: (
    page: number,
    pageSize: number,
    search?: string,
    categoryId?: number
  ) => ["recipes", page, pageSize, search, categoryId] as const,
}

export const recipeKeys = {
  all: ["recipe"] as const,

  detail: (id: string) => ["recipe", id] as const,
};