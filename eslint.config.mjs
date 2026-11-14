import { plugin as shadcn } from "@shadcn/lint";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Design system rules (@shadcn/lint). Components are discovered from components.json,
  // theme tokens from app/globals.css.
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { shadcn },
    rules: {
      // everywhere, including the kit itself: catch classes Tailwind can't generate
      "shadcn/no-unknown-classes": "error",
      // icons come from Heroicons (24/outline); Lucide is banned
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
    // code that *uses* the kit: stay on the theme and let components own their look
    files: ["app/**/*.{ts,tsx}"],
    rules: {
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
      "shadcn/no-restyle": [
        "error",
        {
          allow: ["layout"],
          contracts: [
            // sized and coloured by font-size / currentColor on purpose
            { pattern: "^Spinner$", allow: ["layout", "text-*"] },
            // placeholders mimic whatever shape they stand in for
            { pattern: "^Skeleton$", allow: ["layout", "shape"] },
            // padding depends on the surface the scroller sits in
            { pattern: "^MessageScrollerContent$", allow: ["layout", "spacing"] },
            // the trigger *is* the caller's area
            {
              pattern: "^ContextMenuTrigger$",
              allow: ["layout", "shape", "spacing", "typography", "color"],
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
