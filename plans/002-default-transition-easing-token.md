# 002 — Make the token the default easing for every bare `transition`

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file, 1 line

## Problem

Every Tailwind `transition`, `transition-colors`, `transition-transform` etc. without its own `ease-*` class uses Tailwind's built-in default, `--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)` (from `node_modules/tailwindcss/theme.css`). That curve is outside the project's motion tokens. It drives the switch thumb (`components/ui/switch.tsx:25`, `transition-transform`), chevron rotations (`components/nav-main.tsx`, `transition-transform`), and dozens of `transition-colors` hover states.

## Target

In `app/globals.css`, inside the `@theme { ... }` block, directly under the existing easing tokens:

```css
    --ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);
    /* every bare `transition-*` uses the token curve */
    --default-transition-timing-function: var(--ease-out);
```

The default duration (`--default-transition-duration: 150ms`) stays as is: it is within the 100–160ms press and 125–200ms small-UI budgets.

## Repo conventions to follow

- Motion tokens live only in `app/globals.css` `@theme { ... }` (top of file). Exemplar: the existing `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` line.

## Steps

1. Open `app/globals.css`, find the line `    --ease-overshoot: cubic-bezier(0.34, 1.56, 0.64, 1);` inside `@theme {`.
2. Insert directly after it the two lines from Target (comment + `--default-transition-timing-function: var(--ease-out);`).

## Boundaries

- Do NOT change any component file.
- Do NOT change `--default-transition-duration`.
- If the `@theme {` block or the `--ease-overshoot` line is missing, STOP and report.

## Verification

- **Mechanical**: `pnpm lint` and `pnpm typecheck` exit 0.
- **Feel check**: in the kitchen sink, toggle the Switch demo and hover sidebar items. In DevTools, the switch thumb's computed `transition-timing-function` is `cubic-bezier(0.23, 1, 0.32, 1)`. The thumb should leave quickly and settle softly; hover colors should feel immediate.
- **Done when**: an element with only `transition-colors` (e.g. a `<Input>`) computes `transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1)`.
