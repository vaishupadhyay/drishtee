import { AssistShell } from "@/components/assist/assist-shell";
import { QuestionStepper } from "@/components/assist/question-stepper";
export default function DraftPage() { return <AssistShell eyebrow="Guided drafting" title="One small question at a time."><p className="mt-5 text-[17px] leading-7 text-[#526074]">We&apos;ll only ask what helps make the report clear. You can change every detail later.</p><QuestionStepper /></AssistShell>; }
