"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export default function ToastExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast.add({ title: "Event created", description: "Sunday at 9:00" })
        }
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          const id = toast.add({
            title: "Message archived",
            actionProps: { children: "Undo", onClick: () => toast.close(id) },
          })
        }}
      >
        With action
      </Button>
    </div>
  )
}
