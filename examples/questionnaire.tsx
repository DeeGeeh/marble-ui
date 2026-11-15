"use client"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import { toast } from "@/components/ui/toast"

const questionnaireItems = [
  {
    name: "stack",
    required: true,
    choices: [{ value: "next" }, { value: "start" }],
  },
] as const

export default function QuestionnaireExample() {
  return (
    <Questionnaire
      className="max-w-lg"
      defaultItem="stack"
      items={questionnaireItems}
      onSubmit={(event) => {
        event.preventDefault()
        toast.add({ title: "Submitted" })
      }}
    >
      <QuestionnaireProgress />
      <QuestionnaireItem name="stack" required>
        <QuestionnaireTitle>Which framework?</QuestionnaireTitle>
        <QuestionnaireDescription>Pick one.</QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="next">
            <span className="font-medium">Next.js</span>
            <QuestionnaireChoiceDescription>
              App router, RSC.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="start">
            <span className="font-medium">TanStack Start</span>
            <QuestionnaireChoiceDescription>
              Type-safe routing.
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions className="w-full">
        <QuestionnairePrevious />
        <QuestionnaireNext>Next</QuestionnaireNext>
        <QuestionnaireSubmit>Submit</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}
