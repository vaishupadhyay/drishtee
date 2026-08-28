import { defaultAccessibilityPreferences, type AccessibilityPreferences } from "@/lib/accessibility/preferences";

export type AssistSession = {
  input?: string;
  inputMethod?: "speak" | "scan" | "type" | "upload";
  draftAnswers: Record<string, string>;
  preferences: AccessibilityPreferences;
  offlineQueued?: boolean;
  updatedAt: number;
};

const key = "drishtee-assist-session";
export const emptyAssistSession = (): AssistSession => ({ draftAnswers: {}, preferences: defaultAccessibilityPreferences, updatedAt: Date.now() });
export function readAssistSession(): AssistSession {
  if (typeof window === "undefined") return emptyAssistSession();
  try { return { ...emptyAssistSession(), ...JSON.parse(window.sessionStorage.getItem(key) || "{}"), preferences: { ...defaultAccessibilityPreferences, ...JSON.parse(window.sessionStorage.getItem(key) || "{}").preferences } }; } catch { return emptyAssistSession(); }
}
export function updateAssistSession(update: Partial<AssistSession>) {
  const next = { ...readAssistSession(), ...update, updatedAt: Date.now() };
  window.sessionStorage.setItem(key, JSON.stringify(next));
  return next;
}
export function updatePreferences(preferences: AccessibilityPreferences) { return updateAssistSession({ preferences }); }
