import { randomBytes } from "node:crypto";

import type { StoredRecipeSession } from "./types";

const sessionStore = new Map<string, StoredRecipeSession>();

export function createSession(data: Omit<StoredRecipeSession, "createdAt">) {
  const sessionId = randomBytes(3).toString("hex");

  sessionStore.set(sessionId, {
    ...data,
    createdAt: Date.now(),
  });

  return sessionId;
}

export function getSession(sessionId: string) {
  return sessionStore.get(sessionId);
}
