# Marble UI

A shadcn registry: Base UI components in a marble, glossy, chunky finish.

Docs and live demos: https://marble-ui.vercel.app

## Install

In a Next.js app with Tailwind v4 and shadcn set up:

```sh
# everything: theme and every component
npx shadcn@latest add DeeGeeh/marble-ui/marble-kit

# or just what you need: name the theme so it replaces the default colours
npx shadcn@latest add DeeGeeh/marble-ui/marble-theme DeeGeeh/marble-ui/button
```

The kit and the theme replace the colours `shadcn init` wrote with Marble's tokens, materials and motion, and ask before overwriting; pass `--yes` to skip the prompt. A component added on its own only adds the tokens you don't have yet. Then load Geist, Geist Mono and Bricolage Grotesque as `--font-sans`, `--font-mono` and `--font-display`, with the app wrapped in `<ThemeProvider>` (see `app/layout.tsx`).

Works in monorepos too: components land wherever the `ui` alias in `components.json` points.

## Develop

```sh
pnpm dev        # docs site at localhost:3000
pnpm registry   # rebuild registry.json and public/r after changing components
```
