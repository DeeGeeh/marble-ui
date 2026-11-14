# Animation plans

Written by `improve-animations` against commit `994b7e5`. Each plan is self-contained: hand it to any agent (or run `improve-animations execute <plan>`).

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Popup easing on the `--ease-out` token](001-popup-easing-tokens.md) | HIGH | DONE |
| 002 | [Token as the default `transition` easing](002-default-transition-easing-token.md) | LOW | DONE |
| 003 | [Press feedback on every pressable](003-press-feedback-on-pressables.md) | MEDIUM | DONE |
| 004 | [Sheet on the drawer curve](004-sheet-drawer-curve.md) | MEDIUM | DONE |
| 005 | [Reduced motion for sheet, drawer, sidebar](005-reduced-motion-for-transitions.md) | MEDIUM | DONE |
| 006 | [Interruptible height for Accordion + Collapsible](006-height-transitions-accordion-collapsible.md) | MEDIUM | DONE |

## Execution order

1. **001**, **002**: token wiring, highest reach for the least change.
2. **003**: press feedback (independent).
3. **004**: sheet curve. Do this **before 005**, which edits nothing in `sheet.tsx` but is verified against the sheet's final transition.
4. **005**: reduced-motion policy in `app/globals.css`.
5. **006**: height transitions.

## Dependencies

- 004 → 005 (verify 005 after the sheet's curve is final).
- 002 and 005 both edit `app/globals.css` (different blocks: `@theme` vs `@layer base`). Run them one after the other, not in parallel.
- All others are independent and touch disjoint files.

## Not planned (from the audit)

- Modals at 100ms (LOW): optional `duration-200` on `dialog.tsx:60` / `alert-dialog.tsx:55`.
- Popups on keyframes → Base UI transitions (MEDIUM, largest change): revisit after 001; the easing fix removes most of the felt problem.
- Copy-button icon swap (missed opportunity): a 150ms blur/scale crossfade in `code-block.tsx`.
