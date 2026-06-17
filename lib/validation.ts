import type { RecipeSessionInput } from "./types";

function cleanValue(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function validateRecipeSessionInput(body: unknown): {
  valid: boolean;
  data?: RecipeSessionInput;
  message?: string;
} {
  if (!body || typeof body !== "object") {
    return { valid: false, message: "Invalid JSON body." };
  }

  const parsed = {
    mealType: cleanValue((body as Record<string, unknown>).mealType),
    ingredients: cleanValue((body as Record<string, unknown>).ingredients),
    allergies: cleanValue((body as Record<string, unknown>).allergies),
    diet: cleanValue((body as Record<string, unknown>).diet),
    source: cleanValue((body as Record<string, unknown>).source),
  };

  if (!parsed.mealType || !parsed.ingredients || !parsed.diet) {
    return {
      valid: false,
      message: "mealType, ingredients and diet fields are required.",
    };
  }

  return {
    valid: true,
    data: {
      mealType: parsed.mealType,
      ingredients: parsed.ingredients,
      allergies: parsed.allergies || "not specified",
      diet: parsed.diet,
      source: parsed.source || "unknown",
    },
  };
}
