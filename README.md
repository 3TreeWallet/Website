# 3Tree Website

Source for the 3Tree product website and help/documentation site. It is a static
export built with Next.js, serving the landing / privacy / terms pages at
`3tree.xyz` and the help center (`app/docs`) at `help.3tree.xyz`.

## Stack

- Next.js static export (`output: export`), run through the `vinext` toolchain
- React 19 + TypeScript
- Tailwind CSS 4, with UI primitives under `components/ui`
- Cloudflare Workers (`wrangler`) to serve and preview the build

## Requirements

- Node.js >= 22.13

## Commands

```
npm ci            # install locked dependencies
npm run dev       # local development server
npm run build     # produce the static export
npm start         # preview the built site via wrangler
npm run lint      # oxlint
npm run format    # oxfmt
npx tsc --noEmit  # type check
```

## Project structure

```
app/
  page.tsx        Landing page
  docs/           Help / documentation center
  privacy/        Privacy policy
  terms/          Terms of use
  layout.tsx      Root layout and fonts
  i18n.ts         UI strings (Chinese default, English)
  globals.css     Global styles
components/
  ui/             UI primitives
  CookieConsent.tsx
hooks/            Client hooks
lib/              Shared helpers
public/           Static assets (logo, token icons, images, robots.txt, sitemap.xml)
assets/           Source images
```

## Internationalization

The site ships in Chinese and English. Chinese is the default locale; English
translations live in `app/i18n.ts`.

## Download manifest

`app/release.json` holds the published Android APK version, download URL and
integrity values (SHA-256, signing-certificate SHA-256, size in bytes) shown on
the download section. These values mirror the public release, are inlined at
build time, and are updated whenever a new version is published.

## Not committed

`node_modules/`, build output (`.next/`, `dist/`), Cloudflare local state
(`.wrangler/`) and local hosting metadata (`.openai/`) are excluded via
`.gitignore`.
