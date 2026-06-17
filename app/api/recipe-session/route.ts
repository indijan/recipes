import { NextResponse } from "next/server";

import { createSession } from "@/lib/session-store";
import { validateRecipeSessionInput } from "@/lib/validation";

const PUBLIC_APP_URL = "https://recipes-pi-liard.vercel.app";

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
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = request.headers.get("host");

  const runtimeOrigin =
    forwardedProto && forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : host
        ? `https://${host}`
        : PUBLIC_APP_URL;

  return NextResponse.json({
    success: true,
    sessionId,
    url: `${runtimeOrigin}/recipe/${sessionId}`,
  });
}
