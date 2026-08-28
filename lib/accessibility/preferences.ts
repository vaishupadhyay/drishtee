export type TextSize = "standard" | "large" | "extra-large";

export type AccessibilityPreferences = {
  textSize: TextSize;
  simpleLanguage: boolean;
  fewerQuestions: boolean;
  detailedExplanations: boolean;
};

export const defaultAccessibilityPreferences: AccessibilityPreferences = {
  textSize: "standard",
  simpleLanguage: false,
  fewerQuestions: false,
  detailedExplanations: false,
};

export function buildPreferenceContext(preferences: AccessibilityPreferences) {
  return [
    preferences.simpleLanguage ? "Use short, simple sentences and familiar words." : "Use standard plain language.",
    preferences.fewerQuestions ? "Ask at most one follow-up question." : "Ask only the minimum necessary follow-up questions.",
    preferences.detailedExplanations ? "Add one short reassurance sentence explaining why each question matters." : "Keep explanations concise.",
  ].join(" ");
}
