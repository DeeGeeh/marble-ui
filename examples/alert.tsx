import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <InformationCircleIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can add components with the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <ExclamationTriangleIcon />
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>Check your card details.</AlertDescription>
      </Alert>
    </div>
  )
}
