# UConn DMD Course Resources

Supplemental learning content for Digital Media & Design courses at the University of Connecticut. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), published to GitHub Pages at `https://bdaley.github.io/courses/`.

Courses hosted:

- **DMD 1070/5070 — Web Design I**: the design process, HTML, CSS, and deploying a complete website.
- **DMD 4025 — Putting It All Together**: portfolios, career planning, networking, and the job hunt.

## 🚀 Project Structure

```
src/
  content/
    docs/
      index.mdx              # site home → course picker
      dmd-1070/              # Web Design I content
      dmd-4025/              # Putting It All Together content
  components/
    CourseSidebar.astro      # course-scoped sidebar + switcher override
    InteractiveCode.astro    # Sandpack live code editor
    SandpackPreview.tsx
astro.config.mjs             # site, base, and Starlight config
```

To add a new course: create its directory under `src/content/docs/`, add a course `index.mdx`, then add a top-level sidebar group in `astro.config.mjs`.

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

## 🚀 Deploy

Pushed to the `main` branch on GitHub, `.github/workflows/deploy.yml` builds and publishes to GitHub Pages. The repo must be named `courses` for the `/courses/` base path to resolve correctly on GitHub Pages.
