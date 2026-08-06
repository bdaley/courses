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

This site hosts supplemental learning content for multiple **Digital Media & Design** courses at the University of Connecticut, currently **DMD 1070/5070** (Web Design I) and **DMD 4025** (Putting It All Together).

DMD 1070 is an introductory course in web design and development covering:

- The design process and website planning
- Image editing and resizing
- HTML coding
- CSS coding
- Basic understanding of JavaScript's role (not explicitly taught, but students are encouraged to research and use JS when applicable)
- FTP deployment of a complete website

By the end of the course, students should be able to design, build, and deploy a complete website.

DMD 4025 is a capstone course preparing students for life after graduation: portfolios, career planning, networking, and the job hunt. Its content is currently a structural skeleton.

When importing or verifying DMD 4025 content, use the `gitbook-dmd` MCP server's `searchDocumentation` and `getPage` tools to pull content from the GitBook source.

**Interactive components** (Sandpack live code editors and Starlight Quiz formative assessments) should be used liberally throughout all sections to encourage hands-on experimentation and self-check learning.

## Project type

Astro + Starlight documentation site. All content is Markdown under `src/content/docs/`. The site supports multiple courses: each course lives in its own top-level directory under `src/content/docs/` and has its own sidebar group defined in `astro.config.mjs`. The sidebar is scoped to the active course via the `CourseSidebar.astro` override, which adds a course selector dropdown.

## Deploy

Published to GitHub Pages at `https://bdaley.github.io/courses/` (configured via `site` and `base` in `astro.config.mjs`). The repo was renamed from `dmd-1070-5070` to `courses` to match the new base path.

## Tooling notes

- **No lint, test, or typecheck scripts exist.** The default `tsconfig.json` extends `astro/tsconfigs/strict` but there is no `astro check` or `tsc` invocation configured.
- VSCode extension `astro-build.astro-vscode` is recommended (listed in `.vscode/extensions.json`).
- Local LM Studio AI provider configured in `opencode.json` for offline development.

## Content structure

Each course is a top-level directory under `src/content/docs/` with its own `index.mdx` landing page. `src/content/docs/index.mdx` is the site-wide course picker.

```
src/content/docs/
  index.mdx              # site home → course picker (splash, no sidebar)
  dmd-1070/              # Web Design I — course home + unit subdirectories
    index.mdx
    getting-started/
    html-basics/
    ...
  dmd-4025/              # Putting It All Together — course home + unit subdirectories
    index.mdx
    career-planning/
    portfolio/
    ...
```

To add a new course: create its directory under `src/content/docs/`, add a course `index.mdx`, then add a new top-level sidebar group in `astro.config.mjs`. No other code changes are required.

**Sidebar behavior:** the `CourseSidebar.astro` override (`src/components/CourseSidebar.astro`) reads `Astro.locals.starlightRoute.sidebar`, treats each top-level sidebar group as a course, and renders a `<select>` switcher plus only the active course's entries. Keep the first item of each course group as `{ slug: '<course-dir>' }` so the switcher has a landing URL.

**Pagination:** `prev`/`next` pagination follows the flattened sidebar order across all courses, so set `prev: false` on each course's `index.mdx` and `next: false` on each course's final page to stop pagination at course boundaries.

**Note on `.md` vs `.mdx`:** Both `InteractiveCode` and `Quiz` are Astro/React components that must be imported, so any page using them **must** be `.mdx` (not `.md`). Plain `.md` files cannot use component imports.

## Starlight Quiz

Quizzes can be added to any `.mdx` page using the `<Quiz>` component from `starlight-quiz/components`.

**Important: When a page has more than one `<Quiz>`, each quiz MUST have a unique `id` and a `title` prop.** Without them, the progress tracker gives every quiz the same fallback id hash and only one shows up in the sidebar progress widget. Single-quiz pages can omit these props.

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

## Image Zoom (starlight-image-zoom)

All Markdown/MDX images on the site automatically get click-to-zoom functionality via the `starlight-image-zoom` plugin. No component import or per-image config is needed — it hooks into Starlight's `MarkdownContent` override globally.

**Configuration** (in `astro.config.mjs`):

```js
import starlightImageZoom from 'starlight-image-zoom';

// In the starlight plugins array:
plugins: [starlightImageZoom({ showCaptions: true })],
```

- `showCaptions` (default `true`) — shows the image alt text as a caption in the zoomed overlay
- Works with Markdown `![alt](src)`, HTML `<img>`, and Astro `<Image>` / `<Picture>` syntax
- No client-side third-party dependencies; uses the native `<dialog>` element

**Plugin reference:** https://starlight-image-zoom.vercel.app/getting-started/
**Configuration options:** https://starlight-image-zoom.vercel.app/configuration/

