# AGENTS.md

## Quick start

```bash
npm install
npm run dev     # dev server at localhost:4321
npm run build   # production build to dist/
npm run preview # serve built site locally
```

`npm run start` is an alias for `npm run dev`.

## Project type

Astro + Starlight documentation site. All content is Markdown under `src/content/docs/`. Sidebars are auto-generated from subdirectory structure (see `astro.config.mjs` sidebar config).

## Deploy

Published to GitHub Pages at `https://bdaley.github.io/dmd-1070-5070/` (configured via `site` and `base` in `astro.config.mjs`).

## Tooling notes

- **No lint, test, or typecheck scripts exist.** The default `tsconfig.json` extends `astro/tsconfigs/strict` but there is no `astro check` or `tsc` invocation configured.
- VSCode extension `astro-build.astro-vscode` is recommended (listed in `.vscode/extensions.json`).
- Local LM Studio AI provider configured in `opencode.json` for offline development.

## Content structure

```
src/content/docs/
  getting-started/   # auto-generated sidebar
  reference/         # auto-generated sidebar
guides/              # manual sidebar entries defined in astro.config.mjs
```

## Starlight Quiz

Quizzes can be added to any `.mdx` page using the `<Quiz>` component from `starlight-quiz/components`.

```astro
---
import { Quiz } from 'starlight-quiz/components';
---

<Quiz>
Which of these are programming languages?

- [x] Python
- [ ] HTML
- [x] JavaScript
- [ ] CSS
</Quiz>
```

- `[x]` = correct answer, `[ ]` = incorrect
- Single `[x]` renders radio buttons; multiple `[x]` switches to checkboxes
- Fill-in-the-blank: `[[answer]]` in text
- Content after the answer list is hidden until submitted

Additional components: `<QuizResults>`, `<QuizIntro>`, `<QuizProgress>` (all from `starlight-quiz/components`).

**Plugin reference:** https://ewels.github.io/starlight-quiz/guides/quick-start/
**Configuration options:** https://ewels.github.io/starlight-quiz/guides/configuration/

