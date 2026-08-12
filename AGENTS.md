# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single Next.js 14 (App Router) portfolio site. There is no backend, database, or auth — the only service is the Next.js process. Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`) and `README.md`.

Non-obvious notes:

- **Dev server**: `npm run dev` serves everything on `http://localhost:3000`. The primary site and an alternate design variant at `/v2` are the same app. No env vars are required.
- **Lint config**: `next lint` needs an ESLint config to run non-interactively. `.eslintrc.json` (extends `next/core-web-vitals`) is committed for this reason — without it, `npm run lint` prompts interactively and hangs in an automated shell.
- **Expected harmless warning**: the dev/build logs print `Failed to find font override values for font 'Bodoni Moda'`. This is non-fatal and does not affect functionality.
- **Images/fonts are external**: case-study images are hot-linked from the Squarespace CDN and fonts come from Google Fonts. If outbound network is blocked, pages still render but images/fonts fall back — this is not a setup failure.
- **Contact form**: submission is a local success state only (no email is sent), so submitting the form and seeing "Thanks, got it." is the expected end-to-end behavior.
- **No tests**: there is no test framework or `test` script configured.
