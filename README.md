# Marble UI

A shadcn registry: Base UI components in a marble, glossy, chunky finish.

Docs and live demos: https://marble-ui.vercel.app

## Install

In a Next.js app with Tailwind v4 and shadcn set up:

```sh
# everything: theme and every component
npx shadcn@latest add DeeGeeh/marble-ui/marble-kit

# or one component (pulls in the theme and whatever it depends on)
npx shadcn@latest add DeeGeeh/marble-ui/button
```

The kit replaces the colours `shadcn init` wrote with Marble's tokens, materials and motion. A single component only adds the tokens you don't have yet, so install the kit first. Then load Geist, Geist Mono and Bricolage Grotesque as `--font-sans`, `--font-mono` and `--font-display`, with the app wrapped in `<ThemeProvider>` (see `app/layout.tsx`).

Works in monorepos too: components land wherever the `ui` alias in `components.json` points.

## Develop

```sh
pnpm dev        # docs site at localhost:3000
pnpm registry   # rebuild registry.json and public/r after changing components
```
