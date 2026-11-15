import { Button as ButtonPrimitive } from "@base-ui/react/button"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-[translate,scale,box-shadow,background-color,color,opacity] duration-150 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:duration-100 active:not-aria-[haspopup]:translate-y-0.5 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 in-data-nest:rounded-(--nest-radius) aria-busy:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 pointer-coarse:after:absolute pointer-coarse:after:-inset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-0 key text-primary-foreground shadow-key [--face:var(--primary)] hover:[--face:color-mix(in_oklch,var(--primary),white_8%)] active:shadow-key-pressed",
        outline:
          "border-input key shadow-key [--face:var(--card)] hover:text-foreground hover:[--face:var(--muted)] active:shadow-key-pressed aria-expanded:text-foreground aria-expanded:[--face:var(--muted)] dark:border-border",
        secondary:
          "border-0 key text-secondary-foreground shadow-key [--face:var(--secondary)] hover:[--face:color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] active:shadow-key-pressed aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "border-0 key text-white shadow-key [--face:var(--destructive-solid)] hover:[--face:color-mix(in_oklch,var(--destructive-solid),white_8%)] focus-visible:ring-destructive/20 active:shadow-key-pressed dark:focus-visible:ring-destructive/40",
        link: "text-primary-text underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),12px)] px-3 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-11 gap-2 rounded-xl px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9",
        "icon-xs":
          "size-7 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  loading = false,
  tooltip,
  disabledReason,
  disabled,
  focusableWhenDisabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    tooltip?: React.ReactNode
    disabledReason?: React.ReactNode
  }) {
  const explained = disabledReason != null
  const button = (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      aria-busy={loading || undefined}
      disabled={disabled || loading || explained}
      focusableWhenDisabled={focusableWhenDisabled || loading || explained}
      className={cn(
        buttonVariants({ variant, size }),
        explained && "opacity-50",
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span className="invisible contents">{children}</span>
          <Spinner className="absolute inset-0 m-auto" />
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )

  const tip = explained ? disabledReason : tooltip
  if (tip == null) return button

  return (
    <Tooltip>
      <TooltipTrigger render={button} />
      <TooltipContent>{tip}</TooltipContent>
    </Tooltip>
  )
}

export { Button, buttonVariants }
