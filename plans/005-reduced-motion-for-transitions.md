# 005 — Reduced motion: drop slides from sheet, drawer and sidebar

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`app/globals.css`), one CSS block extended

## Problem

`app/globals.css` already has a reduced-motion block inside `@layer base`. It neutralises tw-animate's zoom/slide variables (so menus and popovers only fade) and turns off smooth scrolling. But three surfaces move with plain CSS **transitions** that this block doesn't reach, so they still slide for users who asked for reduced motion:

- **Sheet**: `components/ui/sheet.tsx:53` (`data-slot="sheet-content"`) slides 2.5rem via `data-starting-style:translate-*` / `data-ending-style:translate-*` with `transition duration-200`.
- **Drawer**: `components/ui/drawer.tsx:118` (`data-slot="drawer-popup"`) slides its full height/width via `transition-[transform,height,opacity,filter] duration-450`, using `transform` from Base UI's drawer variables.
- **Sidebar**: `components/ui/sidebar.tsx:219` (`data-slot="sidebar-gap"`, `transition-[width]`) and `components/ui/sidebar.tsx:230` (`data-slot="sidebar-container"`, `transition-[left,right,width]`) slide the sidebar open/closed.

Current reduced-motion block (`app/globals.css`, inside `@layer base`):

```css
  @media (prefers-reduced-motion: reduce) {
    * {
      --tw-enter-scale: 1 !important;
      --tw-exit-scale: 1 !important;
      --tw-enter-translate-x: 0 !important;
      --tw-enter-translate-y: 0 !important;
      --tw-exit-translate-x: 0 !important;
      --tw-exit-translate-y: 0 !important;
      scroll-behavior: auto !important;
    }
  }
```

## Target

Reduced motion means **fewer and gentler** animations, not zero: keep opacity fades, remove position changes. Extend the same `@media` block so it reads exactly:

```css
  @media (prefers-reduced-motion: reduce) {
    * {
      --tw-enter-scale: 1 !important;
      --tw-exit-scale: 1 !important;
      --tw-enter-translate-x: 0 !important;
      --tw-enter-translate-y: 0 !important;
      --tw-exit-translate-x: 0 !important;
      --tw-exit-translate-y: 0 !important;
      scroll-behavior: auto !important;
    }

    /* sheet + drawer: fade in place instead of sliding */
    [data-slot="sheet-content"],
    [data-slot="drawer-popup"] {
      transition-property: opacity !important;
    }
    [data-slot="sheet-content"]:is([data-starting-style], [data-ending-style]) {
      translate: none !important;
    }
    [data-slot="drawer-popup"]:is([data-starting-style], [data-ending-style]) {
      transform: none !important;
      opacity: 0 !important;
    }

    /* sidebar: open/close without sliding */
    [data-slot="sidebar-gap"],
    [data-slot="sidebar-container"] {
      transition: none !important;
    }
  }
```

Deliberately NOT changed: button/toggle press feedback (a ≤3% scale is feedback, not travel), spinner and skeleton (already `motion-reduce:animate-none` in their components), popups (already covered by the tw-animate variables).

## Repo conventions to follow

- Global motion policy lives in `app/globals.css` `@layer base` (exemplar: the existing reduced-motion block quoted above). Do not add `motion-reduce:` classes to these components for this; keep the policy in one place.

## Steps

1. Open `app/globals.css`, find `@media (prefers-reduced-motion: reduce) {` inside `@layer base`.
2. Replace that whole `@media` block with the Target block above, verbatim.

## Boundaries

- Do NOT edit `sheet.tsx`, `drawer.tsx`, `sidebar.tsx` or any component.
- Do NOT remove or weaken the existing `--tw-*` and `scroll-behavior` rules.
- If the existing block differs from the quoted current code, STOP and report.

## Verification

- **Mechanical**: `pnpm lint`, `pnpm typecheck` exit 0.
- **Feel check**: DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce". Then:
  - Open the Sheet demo: it fades in **in place**, no slide. Close it: it fades out without moving.
  - Open the Drawer demo: it fades in at its resting position, no slide up. Swipe-to-dismiss still works (it follows the finger; only the open/close animation is reduced).
  - Toggle the sidebar (trigger button): it opens/closes instantly, no slide.
  - Switch the emulation off: all three slide again exactly as before.
- **Done when**: with reduced motion emulated, no element changes position during an open/close; fades remain.
