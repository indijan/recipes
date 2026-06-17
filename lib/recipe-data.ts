import type { RecipeSessionInput } from "./types";
import { validateRecipeSessionInput } from "./validation";

export function encodeRecipeData(input: RecipeSessionInput) {
  const json = JSON.stringify(input);
  const base64url = Buffer.from(json, "utf8").toString("base64url");

  return encodeURIComponent(base64url);
}

export function decodeRecipeData(dataParam: string): {
  valid: boolean;
  data?: RecipeSessionInput;
  message?: string;
} {
  try {
    const decodedParam = decodeURIComponent(dataParam);
    const json = Buffer.from(decodedParam, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as unknown;
    const validated = validateRecipeSessionInput(parsed);

    if (!validated.valid || !validated.data) {
      return {
        valid: false,
        message: "A data parameter ervenytelen.",
      };
    }

    return { valid: true, data: validated.data };
  } catch {
    return {
      valid: false,
      message: "A data parameter hibasan kodolt vagy serult.",
    };
  }
}
