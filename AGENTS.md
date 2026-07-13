# AGENTS.md

## Quick start

```bash
npm install
npm run dev     # dev server at localhost:4321
npm run build   # production build to dist/
npm run preview # serve built site locally
```

`npm run start` is an alias for `npm run dev`.

## Course context

This site is an interactive learning companion for **DMD 1070** (undergraduate) and **DMD 5070** (graduate) at the University of Connecticut. DMD 1070 is an introductory course in web design and development covering:

- The design process and website planning
- Image editing and resizing
- HTML coding
- CSS coding
- Basic understanding of JavaScript's role (not explicitly taught, but students are encouraged to research and use JS when applicable)
- FTP deployment of a complete website

By the end of the course, students should be able to design, build, and deploy a complete website.

**Interactive components** (Sandpack live code editors and Starlight Quiz formative assessments) should be used liberally throughout all sections to encourage hands-on experimentation and self-check learning.

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

**Note on `.md` vs `.mdx`:** Both `InteractiveCode` and `Quiz` are Astro/React components that must be imported, so any page using them **must** be `.mdx` (not `.md`). Plain `.md` files cannot use component imports.

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

## Interactive Code (Sandpack)

Live code editors can be embedded in any `.mdx` page using the `<InteractiveCode>` component.

```astro
---
import InteractiveCode from '../../../components/InteractiveCode.astro';
---

<InteractiveCode
  html={`<h1>Hello World</h1>
<p>This is editable!</p>`}
  css={`h1 { color: rebeccapurple; }`}
/>
```

- Props: `html` (string) and/or `css` (string)
- Renders a split-pane code editor with live preview
- Only one of `html` or `css` is required; if only `css` is provided, a default HTML shell is used
- Pages using this component must be `.mdx` (not `.md`)

