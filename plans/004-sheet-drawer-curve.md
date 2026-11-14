# 004 — Sheet enters and exits on the drawer curve

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: MEDIUM
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 1 class

## Problem

`components/ui/sheet.tsx:56` (the sheet popup class string) uses `transition duration-200 ease-in-out` for its slide (`data-starting-style:translate-*-[±2.5rem]` + `opacity-0`). `ease-in-out` starts slowly, which delays the entrance at the exact moment the user is watching. Entering/exiting elements take an ease-out-family curve. The sibling `components/ui/drawer.tsx` already uses the drawer curve.

```txt
/* components/ui/sheet.tsx:56, current excerpt */
"fixed z-overlay flex flex-col gap-4 bg-popover ... shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 ..."
```

## Target

```txt
/* target */
"... shadow-lg transition duration-200 ease-drawer data-ending-style:opacity-0 ..."
```

`ease-drawer` resolves to the token `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)` (iOS-like drawer curve) in `app/globals.css` `@theme`. The duration stays 200ms (modal/drawer budget is 200–500ms; this sheet only travels 2.5rem).

## Repo conventions to follow

- Exemplar: `components/ui/drawer.tsx:74` uses `duration-450 ease-drawer`. `components/ui/sidebar.tsx:221` uses `duration-200 ease-drawer`.

## Steps

1. `components/ui/sheet.tsx:56`: replace the class `ease-in-out` with `ease-drawer`. Nothing else changes.
2. Run `pnpm format`.

## Boundaries

- Do NOT change the duration, translate distances, opacity or markup.
- If `ease-in-out` is not on that line, STOP and report.

## Verification

- **Mechanical**: `pnpm lint`, `pnpm typecheck` exit 0; `grep -n 'ease-in-out' components/ui/sheet.tsx` prints nothing.
- **Feel check**: open the Sheet demo. At 10% speed, the sheet should move most of its 2.5rem immediately and glide into place; closing should feel equally quick, never sticky at the start.
- **Done when**: the sheet popup computes `transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1)`.
