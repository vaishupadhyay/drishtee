import { buildPreferenceContext, type AccessibilityPreferences } from "@/lib/accessibility/preferences";
export function understandingPrompt(preferences: AccessibilityPreferences) { return `Identify location, department, service, issue nature, urgency, and helpful accessibility defaults. ${buildPreferenceContext(preferences)}`; }
export function adaptiveQuestionPrompt(preferences: AccessibilityPreferences) { return `Ask the next factual drafting question. ${buildPreferenceContext(preferences)}`; }
