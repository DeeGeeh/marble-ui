import { createCn } from "cn/config"

export const cn = createCn({
  extend: {
    theme: { shadow: ["stone", "key", "key-pressed", "well", "slab", "chip"] },
  },
})
