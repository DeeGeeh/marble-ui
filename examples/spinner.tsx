import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner />
      <Spinner className="text-2xl" />
      <Spinner className="text-5xl" />
      <Button aria-busy>
        <Spinner /> Saving
      </Button>
      <Button variant="outline" aria-busy>
        <Spinner /> Loading
      </Button>
    </div>
  )
}
