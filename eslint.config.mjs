import { plugin as shadcn } from "@shadcn/lint"
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { shadcn },
    rules: {
      "shadcn/no-unknown-classes": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "lucide-react",
              message:
                "Lucide is banned. Use @heroicons/react/24/outline (e.g. XIcon -> XMarkIcon, SearchIcon -> MagnifyingGlassIcon).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["app/**/*.{ts,tsx}", "examples/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            { pattern: "^Spinner$", allow: ["layout", "text-*"] },
            { pattern: "^Skeleton$", allow: ["layout", "shape"] },
            {
              pattern: "^MessageScrollerContent$",
              allow: ["layout", "spacing"],
            },
            {
              pattern: "^ContextMenuTrigger$",
              allow: ["layout", "shape", "spacing", "typography", "color"],
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
