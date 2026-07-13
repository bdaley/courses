---
name: course-content-reviewer
description: Use when asked to review, audit, propose, or plan new educational content for the DMD 1070/5070 web design course site. Examines existing Markdown/MDX files and recommends missing topics, pages, Sandpack examples, Quizzes, and navigation improvements. Use when the user says "review content", "propose new content", "what's missing", "audit pages", "curriculum review", or "content gap analysis". NOT for general code review, bug fixes, or non-content tasks.
---

# Course Content Reviewer

## Context

This site is an interactive learning companion for **DMD 1070** (undergraduate) and **DMD 5070** (graduate) at the University of Connecticut — introductory courses in web design and development. Students are true beginners with no prior HTML, CSS, or design experience.

The site is built with **Astro + Starlight**. Content lives in `src/content/docs/` as `.md` (plain Markdown) or `.mdx` (Markdown with component imports). Pages that use `<InteractiveCode>` or `<Quiz>` **must** be `.mdx`.

## Review Methodology

When given one or more content files, follow this process:

1. **Read and understand** the existing content in full
2. **Identify gaps** — concepts a beginner would need to know but that aren't covered
3. **Propose additions** — new sections, pages, or standalone topics with:
   - Clear explanations at a beginner level
   - `<InteractiveCode>` Sandpack examples with runnable code
   - Formative `<Quiz>` questions to check understanding
4. **Reorganize recommendations** — suggest navigation ordering changes where the current sequence doesn't follow pedagogical best practices

If the user provides a specific file or directory, start there. If they provide nothing, scan the entire `src/content/docs/` tree and propose a holistic review.

## Content Guidelines

### Explanation Style
- Define every new term on first use
- Use analogies and real-world comparisons
- Keep sentences short and direct
- Build from concrete to abstract
- Show the "why" before the "how"

### InteractiveCode (Sandpack) Integration
- Every major concept should have at least one editable live example
- Use the `<InteractiveCode>` component (import from `../../../components/InteractiveCode.astro` relative to a page in a subdirectory, or adjust the path as needed)
- Props: `html={`` `code` ``}` and/or `css={`` `code` ``}`
- Start simple, then layer complexity across the page
- Include "try changing this" prompts after examples to encourage experimentation
- When only CSS is demonstrated without custom HTML, you can omit `html` — the component will use a default HTML shell

### Quiz Integration
- Use `<Quiz>` from `starlight-quiz/components`
- Import: `import { Quiz } from 'starlight-quiz/components';`
- Place quizzes after each logical sub-section (2–5 questions)
- Mix formats:
  - Multiple choice: single `[x]` among `[ ]` options
  - Checkbox: multiple `[x]` answers
  - Fill-in-the-blank: `[[expected answer]]` inline in text
- Test the key takeaway, not trivia
- Content after the answer list is hidden until the user submits

### Page & File Conventions
- Any page using `<InteractiveCode>` or `<Quiz>` must be `.mdx` (not `.md`)
- Sidebar navigation is **auto-generated** from directory structure under `src/content/docs/` — adding a new directory or file there automatically adds it to the sidebar
- Import paths for InteractiveCode depend on nesting depth:
  - `src/content/docs/<topic>/page.mdx` → `../../../components/InteractiveCode.astro`
  - `src/content/docs/<topic>/subtopic/page.mdx` → `../../../../components/InteractiveCode.astro`

### Navigation & Ordering

For a new learner, topics should follow this logical pedagogical progression:

```
 1. Getting Started        (setting up tools, file naming)
 2. Web Design Process     (plan before coding — wireframes, site maps, style tiles)
 3. HTML Basics            (structure and content — tags, paragraphs, headings, links, lists, images, etc.)
 4. Images                 (file types, optimization, the <img> element)
 5. HTML5 & Semantic Markup (meaningful structure — <header>, <nav>, <main>, etc.)
 6. CSS Basics             (presentation — selectors, properties, colors, typography)
 7. The Box Model          (fundamental layout concept — margin, border, padding, content)
 8. CSS Layout             (flexbox, grid, positioning, floats, display)
 9. Responsive Web Design  (media queries, mobile-first, fluid layouts)
10. Bootstrap              (framework introduction)
11. DevTools               (debugging and inspecting)
12. What's Next?           (next steps and resources)
```

Flag any deviations from this order and propose fixes. Note that the current sidebar order follows the directory listing order in the filesystem, so reordering may require renaming directories or adding numeric prefixes.

## Plan Format

When presenting proposals, use this structured format:

```markdown
## Content Review Plan

### Files Reviewed
- src/content/docs/...

### Gaps Identified
1. **[Missing concept/topic]** — explanation of what's missing and why it matters for a beginner

### Proposed New Pages
| Proposed Page | Directory | Key Concepts | InteractiveCode? | Quiz? |
|---|---|---|---|---|

### Proposed Content Additions to Existing Pages
| Page | Section to Add / Enhance | Addition Type |
|---|---|---|

### Navigation Changes
- Current order: ...
- Proposed order: ...
- Rationale: ...

### Open Questions / Uncertainties
- [Any items needing user input]
```

## When to Ask Questions

If you cannot determine any of the following, **ask the user for clarification** before proceeding:

- The appropriate pedagogical sequence for a given topic
- Whether a concept is too advanced for beginners
- Whether a topic overlaps with or is already covered elsewhere
- The correct directory / placement for new content
- Whether the user wants a broad site-wide audit or a focused review of specific files
- Whether the user wants you to implement the proposed changes or just present the plan
