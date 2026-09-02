---
name: blackboard-quiz
description: Use when asked to create, convert, or export a quiz for Blackboard Learn (Original or Ultra) from course content. Generates LLM-resistant, scenario-based questions that test application of course-specific material and outputs tab-delimited .txt and QTI 2.1 .zip ready to import into Blackboard. Use when the user says "blackboard quiz", "export quiz to blackboard", "create quiz for blackboard", "import into blackboard", or invokes /blackboard-quiz.
---

# Blackboard Quiz Generator

## Context

This site is an **Astro + Starlight** documentation site for **DMD 1070/5070** (Web Design I) and related DMD courses. All content lives in `src/content/docs/` as `.md` / `.mdx`. Blackboard (HuskyCT) is the LMS for graded assessments. This skill bridges the two: it turns Starlight content into **Blackboard-importable quizzes** that are hard for LLMs to answer without the course docs.

## When to Use

- User invokes `/blackboard-quiz {context for quiz material}`
- User asks to create a Blackboard test/pool/quiz from existing docs
- User wants to convert an existing `starlight-quiz` page into a Blackboard format

## Inputs

`{context for quiz material}` can be one of:

- A section/directory: `Getting Started`, `src/content/docs/dmd-1070/getting-started/`, `dmd-3440/introduction`
- A single page/file: `src/content/docs/dmd-1070/getting-started/why-index.mdx`
- A free-text description: `the FTP/SFTP connection lab including host, VPN, and public_html`
- Empty: scan `src/content/docs/dmd-1070/getting-started/` as default and ask for confirmation

## Workflow

### 1. Read and Understand the Source Material in Full

- `read` every file in the specified directory (use `glob` first). For a single file, `read` it entirely.
- Identify **course-specific facts** that an LLM would not know without the docs (exact hostnames, paths with `~`, wifi names, file-naming rules, DirectoryIndex order, grading browser, Client vs Server). Those are the raw material for LLM-resistant questions.
- Note the **sidebar order** and **badge** conventions (Video vs Lab) only if they help choose distractors.

### 2. Design 5-10 Questions That Test Understanding, Not Recall

Prefer these patterns in order:

1. **Scenario / Troubleshooting:** "Maya did X and saw Y — what fixes it?" — forces diagnosis.
2. **Apply a Rule:** Given a filename/URL/path, pick the one that follows the rule.
3. **Exact-Match Distinguishers:** Host `dmd-static.grove.ad.uconn.edu` vs `dmd-static.grove.uconn.edu` (missing `.ad.`), `public_html` vs parent, `~` present vs absent, `SFTP` vs `FTP`, `UCONN-SECURE` vs `UCONN-PUBLIC`.
4. **Predict System Behavior:** "Folder `projects/` has only `gallery.html`, what does `/projects/` return?" — tests default-document logic.

Avoid:

- Generic definitions easily answered by ChatGPT ("What does FTP stand for?", "What is HTML?")
- Trivia about admin credentials, RHEL version, Apache logs, or anything not in the student-facing docs
- Questions that require external prior knowledge

Mix question types for Blackboard:

| Type | Blackboard code | Use when |
|---|---|---|
| Multiple Choice (single correct) | `MC` | 60-70% of quiz |
| Multiple Answer (checkboxes) | `MA` | 1-2 questions where "select all that apply" matters |
| True/False | `TF` | 0-1 question for Client vs Server, Safari vs Chrome, etc. |
| Fill in the Blank | `FIB` | 0-1 question for exact syntax (`index.html`, `professor-brian-daley.jpg`) |

### 3. Draft the Quiz Content

For each question write:

- **Stem:** 1-2 sentences, scenario-first, course-specific
- **Options:** 4-5 for MC (one correct, plausible distractors that are common student mistakes from the docs), 4 for MA, 2 for TF, 1 exact answer for FIB
- **Feedback (optional but recommended):** 1 sentence explaining why; include in QTI `itemfeedback`, omit or leave generic in tab file

**Randomize correct answer positions:** For every `MC`/`MA`, shuffle options with a deterministic seed (e.g., `random.seed(1)` in Python) so the correct answer is *not* always `A` (or any single position). Verify distribution across the quiz is spread — not all `A`, not never `A`/`B` — ideally at most 40% at any one letter (e.g., with 7 MC, no more than 3 at the same letter). Blackboard can also randomize on delivery, but the *export* must already be randomized so a student glancing at the raw file can't game it. Keep the `-clean.txt`, `.txt`, QTI, and `.md` preview in sync on the same shuffled order.

### 4. Generate Blackboard-Importable Outputs

Always generate **all three files** and keep them in sync:

#### A. Tab-Delimited `.txt` (+ clean copy for Ultra)

Paths:
- `blackboard-quizzes/<slug>-quiz.txt` (e.g., `getting-started-quiz.txt`) — with `#` header comments for humans/Original
- `blackboard-quizzes/<slug>-quiz-clean.txt` — identical but **header-free** for Ultra's strict parser (generate via `tail -n +13 <slug>-quiz.txt > <slug>-quiz-clean.txt` or equivalent)

Format (tab-separated, UTF-8, no BOM):

```
MC<TAB>Question text<TAB>option text<TAB>correct<TAB>option text<TAB>incorrect<TAB>...
MA<TAB>Question text (Select all...)<TAB>option<TAB>correct<TAB>option<TAB>incorrect...
TF<TAB>Question text<TAB>true   (or false)
FIB<TAB>Question text with blank<TAB>expected answer
```

Example:

```
MC	Which file name follows DMD 1070 rules?	professor-brian-daley.jpg	correct	MyCoolWebsite.HTML	incorrect	my cool website.html	incorrect
MA	Which networks reach dmd-static.grove.ad.uconn.edu?	On campus on UCONN-SECURE Wi-Fi	correct	On campus on UCONN-PUBLIC Wi-Fi	incorrect	Off campus with Cisco AnyConnect VPN connected	correct
TF	Install FileZilla Server for this course.	false
FIB	The default document is __________.	index.html
```

Add a header comment block (lines starting with `#`) in the main `.txt` for human reference. **Ultra cannot parse `#` headers** — its "Upload Questions" parser rejects them. Always also generate a clean copy `blackboard-quizzes/<slug>-quiz-clean.txt` with the same tab lines but **no `#` headers, UTF-8 without BOM, real tabs** — this is the file Ultra users should upload if they use the tab route. Verify `head -1 clean.txt` starts with `MC`/`MA`/`TF`/`FIB`, not `#`.

#### B. QTI 1.2 `.zip` (Blackboard Ultra / Classic Pool import)

Path: `blackboard-quizzes/<slug>-quiz-qti.zip` containing at `zip root`:

- `assessment.xml` — QTI 1.2 `<questestinterop><assessment>` with `<section><item>` per question, matching the tab file exactly (same stems, options, correct keys, points)
- `imsmanifest.xml` — manifest referencing `assessment.xml` as `imsqti_assessment_xmlv1p2`

Use the template in `blackboard-quizzes/qti/` as a starting point. Ensure:

- `ident` values are unique (`q1`..`qn`)
- `response_lid` `rcardinality` is `Single` for MC/TF, `Multiple` for MA, and `response_str` for FIB
- `resprocessing` sets `SCORE` 100 for correct, 0 otherwise; for MA full credit only if all correct and no incorrect selected
- Points default to 10 each (100 total for 10 Qs) — user can reweight in Blackboard

Zip must be flat (no `qti/` subfolder inside zip). Create via:

```bash
python3 -c "
import zipfile, os
zf = zipfile.ZipFile('blackboard-quizzes/<slug>-quiz-qti.zip','w', zipfile.ZIP_DEFLATED)
for f in ['blackboard-quizzes/qti/assessment.xml','blackboard-quizzes/qti/imsmanifest.xml']:
    zf.write(f, os.path.basename(f))
zf.close()
"
```

#### C. Human-Readable Preview (optional but recommended)

Path: `blackboard-quizzes/<slug>-quiz.md` — Markdown preview of the quiz with answer key, coverage, and import instructions. Mirrors the Getting Started example at `blackboard-quizzes/getting-started-quiz.md`. Include:

- Header with source docs and LLM-resistance rationale
- Each question with ✅ marker
- Answer key table/footer
- Import quick-start for Original vs Ultra

### 5. Provide Import Instructions

Always include in the final response, distinguishing Learn Original vs Ultra:

```
**Blackboard Learn Original (tab file):**
Control Panel → Course Tools → Tests, Surveys, and Pools → Tests → Build Test → Upload Questions → Browse → select <slug>-quiz.txt (or -clean.txt) → Submit

**Blackboard Ultra — QTI zip (preferred):**
Course Content → Details & Actions → Question Banks → Manage Banks → Import Bank → Browse → select <slug>-quiz-qti.zip → Submit
  Then: Course Content → + Create → Test → + Add Question → Reuse Questions → Question Banks → select "DMD 1070 - <Section>" → Add
  Alternative if Question Banks is hidden: Open a Test → ... (More) → Import QTI Package → select zip

**Blackboard Ultra — Tab file (fallback):**
Use ONLY the clean file `* -clean.txt` (no # headers). Course Content → + Create → Test → + Add Question → Upload Questions → drag <slug>-quiz-clean.txt → Preview → Import
  If you get "Unable to parse file", re-check file is UTF-8 without BOM and tabs are real tabs (VS Code → View → Render Whitespace should show →).
```

Mention that points default to 10 each (100 total for 10 Qs) and can be reweighted after import. Warn: **do not re-zip or unzip the QTI zip, and do not upload the `#`-header `*.txt` to Ultra** — it will fail.

### 6. Validate

- Run a quick sanity check: count tabs per line for `MC` (should be odd: stem + 2*options), ensure every `correct` has a matching `incorrect` set, no admin usernames or passwords appear in stems/options
- For the tab files: `head -1 <slug>-quiz-clean.txt` must start with `MC`/`MA`/`TF`/`FIB` (not `#`); `head -1 <slug>-quiz.txt` should start with `#`
- If `zip` was requested, verify `zipfile.ZipFile(...).namelist() == ['assessment.xml','imsmanifest.xml']` (flat, no `qti/` subfolder) and that the QTI stems/options/keys exactly match the clean tab file

## File Conventions

- Do not commit `dist/`, `.astro/`, or `node_modules/` artifacts
- Quiz outputs live in `blackboard-quizzes/` (git-tracked); QTI working files in `blackboard-quizzes/qti/` (also tracked as template)
- Slug is kebab-case of the context section (e.g., `getting-started`, `html-basics`, `css-layout`)

## Example Invocation

User: `/blackboard-quiz Getting Started section — need 8 questions on file naming, FileZilla/SFTP, and index.html that ChatGPT can't easily answer`

Agent:

1. `glob` `src/content/docs/dmd-1070/getting-started/*` + `read` each file
2. Draft 8 scenario-based Qs (see example outputs in `blackboard-quizzes/getting-started-*`)
3. Write `blackboard-quizzes/getting-started-quiz.txt` (with headers) + `getting-started-quiz-clean.txt` (no headers), `blackboard-quizzes/qti/assessment.xml` + `imsmanifest.xml`, zip flat to `getting-started-quiz-qti.zip` (`assessment.xml` + `imsmanifest.xml` at zip root), and `getting-started-quiz.md` preview
4. Reply with file list and Ultra vs Original import steps

## What Not to Do

- Do not invent hostnames, paths, or wifi names — copy them verbatim from the docs (`dmd-static.grove.ad.uconn.edu`, `/home/NETID/public_html`, `https://…/~NETID/`, `UCONN-SECURE`, `UCONN-PUBLIC`, `Cisco AnyConnect`)
- Do not include admin usernames (`bpd01001admin`), IAM groups, firewall rules, or package-management details from instructor-only docs
- Do not create “define X” questions that an LLM can answer from generic training data
