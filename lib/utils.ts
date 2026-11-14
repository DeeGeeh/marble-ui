import { createCn } from "cn/config"

// Teach class merging our custom theme shadows (globals.css) so `shadow-none` can override `shadow-well` etc.
export const cn = createCn({
  extend: {
    theme: { shadow: ["stone", "stone-pressed", "key", "key-pressed", "well", "slab", "chip"] },
  },
})
