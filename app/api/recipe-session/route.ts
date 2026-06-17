import { NextResponse } from "next/server";

import { createSession } from "@/lib/session-store";
import { validateRecipeSessionInput } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validated = validateRecipeSessionInput(body);

  if (!validated.valid || !validated.data) {
    return NextResponse.json(
      {
        success: false,
        message: validated.message ?? "Validation failed.",
      },
      { status: 400 },
    );
  }

  const sessionId = createSession(validated.data);
  const origin = request.headers.get("origin") || "http://localhost:3000";

  return NextResponse.json({
    success: true,
    sessionId,
    url: `${origin}/recipe/${sessionId}`,
  });
}
