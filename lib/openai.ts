import type { RecipeSessionInput } from "./types";

const systemPrompt =
  "You are a creative, practical recipe assistant. Based on the provided ingredients, meal goal, allergies, and diet preferences, suggest 3 easy-to-cook recipe ideas. Always treat allergies and excluded foods as strict constraints. Never suggest ingredients that may cause allergy risks. Keep the response friendly, concise, well-structured, and presentation-ready.";

type ResponsesApiOutput = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function extractTextFromResponse(data: ResponsesApiOutput) {
  if (data.output_text && data.output_text.trim().length > 0) {
    return data.output_text;
  }

  const contentTexts =
    data.output
      ?.flatMap((entry) => entry.content ?? [])
      .filter((item) => item.type === "output_text" && Boolean(item.text))
      .map((item) => item.text as string) ?? [];

  return contentTexts.join("\n").trim();
}

export async function generateRecipeIdeas(input: RecipeSessionInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return "OPENAI_API_KEY is missing. Add it in .env.local to enable recipe generation.";
  }

  const userPrompt = `mealType: ${input.mealType}\ningredients: ${input.ingredients}\nallergies: ${input.allergies}\ndiet: ${input.diet}\n\nRequired response format:\n# 3 quick recipe ideas\n\n## 1. Recipe name\nShort description.\nIngredients.\nPreparation in 3-5 steps.\nWhy this is a good choice?\n\n## 2. Recipe name\n...\n\n## 3. Recipe name\n...\n\nEnd with:\nTip: double-check allergens on product labels too.`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      max_output_tokens: 900,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return "Recipe generation failed right now. Please try again shortly.";
  }

  const data = (await response.json()) as ResponsesApiOutput;
  const outputText = extractTextFromResponse(data);

  if (!outputText) {
    return "The AI response was empty, but your request data arrived correctly.";
  }

  return outputText;
}
