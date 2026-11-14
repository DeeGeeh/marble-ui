# 003 — Give every pressable control press feedback

- **Status**: DONE
- **Commit**: 994b7e5
- **Severity**: MEDIUM
- **Category**: Physicality & origin
- **Estimated scope**: 5 files, one class string each

## Problem

Only `Button` responds while pressed (`components/ui/button.tsx`: `active:not-aria-[haspopup]:translate-y-px active:not-aria-[haspopup]:scale-[0.98]` with `transition-[translate,scale,...] duration-150 ease-out`). These pressable controls give no feedback during the press itself, so they feel unresponsive next to buttons. Toggles are glossy raised stone in this design system and especially should "sink" like the button:

- `components/ui/toggle.tsx:8` (toggleVariants base string). Current transition: `transition-[background-color,color,box-shadow]`. No `active:` classes.
- `components/ui/checkbox.tsx:12` (Checkbox root). Current transition: `transition-colors`. No `active:` classes.
- `components/ui/radio-group.tsx:22` (RadioGroupItem root). No transition class, no `active:` classes.
- `components/ui/switch.tsx:25` (switch thumb, `data-slot="switch-thumb"`). Current: `transition-transform`. No press response.
- `components/ui/sidebar.tsx:481` (sidebarMenuButtonVariants base string). Current transition: `transition-[width,height,padding]`. It has `active:bg-*` colour classes but no scale.

## Target

Press feedback is a scale-down on `:active`, transitioned on the token curve. Scales stay within 0.95–0.98 (subtle):

| File:line | Add to the class string | Transition becomes |
| --- | --- | --- |
| `toggle.tsx:8` | `active:scale-[0.97]` | `transition-[background-color,color,box-shadow,scale] duration-150 ease-out` |
| `checkbox.tsx:12` | `active:scale-95` | `transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-out` (replaces `transition-colors`) |
| `radio-group.tsx:22` | `active:scale-95` | add `transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-out` |
| `switch.tsx:25` (thumb) | `group-active/switch:scale-95` | keep `transition-transform`, add `duration-150 ease-out` |
| `sidebar.tsx:481` | `active:scale-[0.98]` | `transition-[width,height,padding,scale]` (keep everything else) |

`ease-out` resolves to the token `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` in `app/globals.css` `@theme`.

## Repo conventions to follow

- Exemplar: `components/ui/button.tsx`, the base string of `buttonVariants`: `transition-[translate,scale,box-shadow,background-color,color,opacity] duration-150 ease-out` with `active:not-aria-[haspopup]:scale-[0.98]`.
- Tailwind v4 `scale-*` utilities set the CSS `scale` property (not `transform`), so `scale` must be in the transition-property list. `transition-transform` already includes `scale`.
- Never `transition-all` (the codebase has none; keep it that way).

## Steps

1. `components/ui/toggle.tsx:8`: in the `toggleVariants` base string, replace `transition-[background-color,color,box-shadow]` with `transition-[background-color,color,box-shadow,scale] duration-150 ease-out` and append `active:scale-[0.97]`.
2. `components/ui/checkbox.tsx:12`: in the root class string, replace `transition-colors` with `transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-out` and append `active:scale-95`.
3. `components/ui/radio-group.tsx:22`: in the `group/radio-group-item` class string, append `transition-[color,background-color,border-color,box-shadow,scale] duration-150 ease-out active:scale-95`.
4. `components/ui/switch.tsx:25`: in the thumb class string (`data-slot="switch-thumb"`), append `duration-150 ease-out group-active/switch:scale-95` (the root already has `group/switch`).
5. `components/ui/sidebar.tsx:481`: in the `sidebarMenuButtonVariants` base string, replace `transition-[width,height,padding]` with `transition-[width,height,padding,scale]` and append `active:scale-[0.98]`.
6. Run `pnpm format`.

## Boundaries

- Do NOT touch `button.tsx` (already correct) or any menu item (menu items are keyboard-navigated and must stay instant).
- Do NOT change colours, shadows, sizes or markup.
- If a listed line doesn't contain the quoted current classes, STOP and report.

## Verification

- **Mechanical**: `pnpm lint` and `pnpm typecheck` exit 0 (`@shadcn/lint` `no-unknown-classes` must accept every new class).
- **Feel check** in the kitchen sink:
  - Press and hold a Toggle, a Checkbox, a Radio, the Switch, and a sidebar nav item: each visibly sinks while held and springs back on release.
  - At 10% speed in DevTools, the press-in reaches its scale almost immediately (fast start) and never overshoots.
  - The pressed scale is subtle: content never looks like it's shrinking away.
- **Done when**: each of the five elements computes `scale: 0.97 / 0.95 / 0.95 / 0.95 / 0.98` respectively while `:active`.
