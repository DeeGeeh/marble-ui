# 006 — Interruptible height transitions for Accordion and Collapsible

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: MEDIUM
- **Category**: Interruptibility (+ missed opportunity: Collapsible snaps)
- **Estimated scope**: 2 files

## Problem

**Accordion** (`components/ui/accordion.tsx:63-67`) animates height with **keyframes**. Toggling quickly restarts from zero, so the panel jumps. It also uses the weak CSS keyword `ease-out`, not the token. Separately, the inner `div` carries `h-(--accordion-panel-height) data-ending-style:h-0 data-starting-style:h-0`, but Base UI puts `data-starting-style`/`data-ending-style` on the **Panel**, not this div, so those classes are dead.

```tsx
// components/ui/accordion.tsx:63-72, current
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) px-4 pt-1 pb-4 text-muted-foreground data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
```

**Collapsible** (`components/ui/collapsible.tsx:15-19`) has no motion at all. Expanding a sidebar nav group (`components/nav-main.tsx:64`, `<CollapsibleContent>`) shoves everything below it down in a single frame.

```tsx
// components/ui/collapsible.tsx:15-19, current
function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}
```

## Target

Both panels use a CSS **transition** on `height` (interruptible: reversing mid-way retargets from the current height), driven by Base UI's measured height variable and its starting/ending style attributes. Duration 200ms (the 150–250ms dropdown-class budget), curve `ease-out`, which resolves to `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Reduced motion: no height animation.

```tsx
// accordion.tsx, target
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden text-sm transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "px-4 pt-1 pb-4 text-muted-foreground [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className
        )}
```

```tsx
// collapsible.tsx, target
function CollapsibleContent({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-content"
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}
```

(`collapsible.tsx` must import `cn`: `import { cn } from "@/lib/utils"`.)

## Repo conventions to follow

- Classes are merged with `cn` from `@/lib/utils` (exemplar: any component, e.g. `components/ui/card.tsx`).
- Never use keyframes for UI that can be toggled rapidly; Base UI's `data-starting-style` / `data-ending-style` + a transition is the house pattern (exemplar: `components/ui/sheet.tsx:56`).
- Easing only via tokens (`ease-out`, `ease-drawer`…), never raw `cubic-bezier`.

## Steps

1. `components/ui/accordion.tsx`: replace the Panel's `className` string with the target string; remove `h-(--accordion-panel-height)`, `data-ending-style:h-0` and `data-starting-style:h-0` from the inner div's string (keep everything else in it).
2. `components/ui/collapsible.tsx`: replace `CollapsibleContent` with the target version and add `import { cn } from "@/lib/utils"` to the imports.
3. Run `pnpm format`.

## Boundaries

- Do NOT touch `nav-main.tsx`, `app/page.tsx` or other consumers. They inherit the change.
- Do NOT remove the `accordion-down`/`accordion-up` keyframes from node_modules or `shadcn/tailwind.css`; just stop using them.
- If `accordion.tsx` or `collapsible.tsx` don't match the quoted current code, STOP and report.

## Verification

- **Mechanical**: `pnpm lint`, `pnpm typecheck` exit 0. `grep -n 'animate-accordion' components/ui/accordion.tsx` prints nothing.
- **Feel check** in the kitchen sink:
  - Accordion demo: open/close items. They expand smoothly with a fast start. **Spam-click** a trigger: the panel reverses from wherever it is, never snapping back to zero first.
  - Sidebar → click the chevron next to "Forms": the sub-list grows open over ~200ms instead of popping; items below slide down with it. Close it: it shrinks smoothly.
  - Collapsible demo ("Show more"): same behaviour.
  - At 10% speed in DevTools, confirm the height change starts immediately (no slow start) and content isn't visible outside the panel during the animation (overflow-hidden).
  - Emulate `prefers-reduced-motion: reduce`: panels open/close instantly.
- **Done when**: both panels transition `height` over 200ms with `cubic-bezier(0.23, 1, 0.32, 1)`, are interruptible, and are instant under reduced motion.
