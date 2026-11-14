# 001 — Put every popup's enter/exit on the `--ease-out` token

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 10 files, one class added per line (14 lines)

## Problem

Popups animate with tw-animate-css keyframes (`data-open:animate-in`, `data-closed:animate-out`). Their timing function is `var(--tw-ease, ease)`: when an element has no `ease-*` class, `--tw-ease` is unset and the animation falls back to the **plain CSS `ease` keyword**. The popups below set a duration (`duration-100`) but no easing, so menus, selects, popovers, hover cards, tooltips and dialogs all open and close on the weak default curve instead of the project's tokens. Menus open tens of times a day, so this is felt constantly.

Lines that set `duration-100` (or no duration) and **no** `ease-*` class:

- `components/ui/dropdown-menu.tsx:44` (DropdownMenuContent popup)
- `components/ui/dropdown-menu.tsx:141` (DropdownMenuSubContent)
- `components/ui/context-menu.tsx:55`
- `components/ui/menubar.tsx:84` (MenubarContent)
- `components/ui/menubar.tsx:259` (MenubarSubContent)
- `components/ui/select.tsx:90`
- `components/ui/combobox.tsx:118`
- `components/ui/popover.tsx:39`
- `components/ui/hover-card.tsx:40`
- `components/ui/tooltip.tsx:52` (no duration class at all; uses tw-animate's 150ms default)
- `components/ui/dialog.tsx:34` (overlay) and `components/ui/dialog.tsx:60` (popup)
- `components/ui/alert-dialog.tsx:33` (overlay) and `components/ui/alert-dialog.tsx:55` (popup)

Example of the current pattern (`components/ui/popover.tsx:39`, excerpt):

```txt
"z-overlay flex w-72 origin-(--transform-origin) flex-col ... duration-100 ... data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out ..."
```

Proof of the fallback, from `node_modules/tw-animate-css/dist/tw-animate.css`:

```css
--animate-in: enter var(--tw-animation-duration,var(--tw-duration,.15s))var(--tw-ease,ease) ...
```

## Target

Each listed class string also contains the Tailwind class `ease-out`. In this project `ease-out` resolves to the token
`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` (defined in `app/globals.css` inside the `@theme { ... }` block), and the class sets `--tw-ease`, which tw-animate's `enter`/`exit` keyframes read.

```txt
/* target, e.g. popover.tsx:39 */
"... duration-100 ease-out ... data-open:animate-in ..."
```

Durations are NOT changed in this plan (100ms is inside the 150–250ms dropdown budget's fast edge and is deliberate here).

## Repo conventions to follow

- Easing tokens live in `app/globals.css`, `@theme { ... }` at the top: `--ease-out`, `--ease-in-out`, `--ease-drawer`, `--ease-overshoot`. Never write a raw `cubic-bezier(...)` in a component.
- Exemplar that already does it right: `components/ui/message-scroller.tsx:102` uses `duration-200 ease-out`.

## Steps

1. In each file/line listed under Problem, insert ` ease-out` immediately after the `duration-100` class in that class string.
2. For `components/ui/tooltip.tsx:52` (no `duration-100`), insert ` ease-out` immediately after `origin-(--transform-origin)` in that class string.
3. Run `pnpm format` (Prettier will reorder classes; that is expected).

## Boundaries

- Do NOT change any duration, animation class, transform-origin, or markup.
- Do NOT touch `components/ui/command.tsx` (the command palette is intentionally instant via `instant` on DialogContent).
- Do NOT add dependencies or new tokens.
- If a listed line no longer contains the expected classes (drift since commit 994b7e5), STOP and report.

## Verification

- **Mechanical**: `pnpm lint` and `pnpm typecheck` exit 0. `grep -c 'ease-out' components/ui/{dropdown-menu,context-menu,menubar,select,combobox,popover,hover-card,tooltip,dialog,alert-dialog}.tsx` shows at least 1 per file (2 for dropdown-menu, menubar, dialog, alert-dialog).
- **Feel check**: open the kitchen sink (`pnpm dev`), open Dropdown Menu, Select, Popover and the Dialog demo:
  - In DevTools → Animations panel at 10% speed, the popup should cover most of its zoom/fade in the first third of the animation (fast start, soft settle), not ramp up slowly.
  - In the Elements panel, the open popup's computed `animation-timing-function` is `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Done when**: every listed popup's computed `animation-timing-function` is `cubic-bezier(0.23, 1, 0.32, 1)` on open and close.
