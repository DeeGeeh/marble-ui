# Marble UI

A shadcn registry: Base UI components in a marble, glossy, chunky finish.

## Install

In a Next.js app with Tailwind v4 and shadcn set up:

```sh
# everything
npx shadcn@latest add https://raw.githubusercontent.com/DeeGeeh/marble-ui/master/public/r/marble-kit.json

# or one component (pulls in the theme and whatever it depends on)
npx shadcn@latest add https://raw.githubusercontent.com/DeeGeeh/marble-ui/master/public/r/button.json
```

Then replace `app/globals.css` with the theme (variables left there by `shadcn init` would override Marble):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "./marble.css";
```

and load Geist, Geist Mono and Bricolage Grotesque as `--font-sans`, `--font-mono` and `--font-display`, with the app wrapped in `<ThemeProvider>` (see `app/layout.tsx`).

## Develop

```sh
pnpm dev        # kitchen sink at localhost:3000
pnpm registry   # rebuild registry.json and public/r after changing components
```
