import type { RecipeSessionInput } from "./types";

const systemPrompt =
  "Te egy kreativ, praktikus receptasszisztens vagy. A feladatod, hogy a megadott alapanyagok, etkezesi cel, allergiak es etrendi preferenciak alapjan adj 3 konnyen elkeszitheto receptotletet. Mindig vedd komolyan az allergiakat es kerulendo eteleket. Ne ajanlj olyan hozzavalot, ami allergias kockazatot jelent. A valasz legyen baratsagos, rovid, jol tagolt es prezentalhato.";

export async function generateRecipeIdeas(input: RecipeSessionInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return "Az OPENAI_API_KEY nincs beallitva. Add meg a .env.local fajlban, hogy a demo teljesen mukodjon.";
  }

  const userPrompt = `mealType: ${input.mealType}\ningredients: ${input.ingredients}\nallergies: ${input.allergies}\ndiet: ${input.diet}\n\nKert valaszformatum:\n# 3 gyors receptotlet\n\n## 1. Recept neve\nRovid leiras.\nHozzavalok.\nElkeszites 3-5 lepesben.\nMiert jo valasztas?\n\n## 2. Recept neve\n...\n\n## 3. Recept neve\n...\n\nVegen:\nTipp: ellenorizd az allergeneket a csomagolason is.`;

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
    return "Nem sikerult receptotletet generalni most. Probald ujra rovidesen a presentation.";
  }

  const data = (await response.json()) as {
    output_text?: string;
  };

  if (!data.output_text) {
    return "Az AI valasz ures lett, de a session adatok rendben beerkeztek.";
  }

  return data.output_text;
}
