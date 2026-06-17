export type RecipeSessionInput = {
  mealType: string;
  ingredients: string;
  allergies: string;
  diet: string;
  source?: string;
};

export type StoredRecipeSession = RecipeSessionInput & {
  createdAt: number;
};
