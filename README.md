# Pathwise Atlas — CSE & IT Career Explorer

A browser-local React application with Tailwind CSS and Lucide icons. Includes **15 fields, 110 career paths, 990 role-specific skill entries, and 440 portfolio projects with 1,320 technical requirements**.

## Run

Use Node.js 24 LTS for the application and its complete test suite.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. No API key, database, or account is required.

```sh
npm test
npm run test:ui
npm run build
npm run preview
```

The production output is in `dist/` and can be served by any static web host.

## Career fields

Software and web; cybersecurity; AI and machine learning; cloud and infrastructure; core systems; IT operations and support; enterprise platforms; product, design, and delivery; quality and performance; blockchain and decentralized systems; research and emerging computing; hardware and silicon; games and spatial computing; analytics; architecture and technical leadership.

Includes specialist tracks such as smart contract auditing, quantum software, compiler engineering, robotics, digital forensics, FPGA, mainframe/COBOL, Salesforce, SAP, ServiceNow, Power Platform, FinOps, accessibility, and technical writing. Titles overlap across employers; this is a broad curated taxonomy, not a claim that every possible job title exists as a separate track.

## Features

- Search career names, skills, tools, and common aliases; filter by field and sort by name or current proficiency.
- Bookmark paths and compare up to three side by side.
- Independent saved assessments per role, with automatic migration of the original application’s data.
- Explicit 0–3 proficiency ratings, tier filters, assessment progress, and readiness indicators.
- Topologically ordered skills; proficient skills are omitted from the learning roadmap.
- Four role-specific portfolio projects, interleaved only after required skills are completed.
- Whole-hour weekly scheduling, task continuation, overflow warnings, and spare-week reporting.
- Mark learned skills proficient with undo, and mark portfolio projects complete to reduce remaining effort.
- Per-path personal notes, whole-workspace JSON backup and restore with preview and undo.
- Markdown export including skills, full project requirements, completion status, notes, and the complete timetable.
- A responsive dark career atlas with a focused learning workspace, keyboard-operated tabs, accessible named dialogs and controls, and reduced-motion support.

## Planning model

Unrated skills are treated as None for planning, but remain visibly unassessed. Self-rated proficiency is the average rating divided by three, not an employability score. Estimated learning time is 100%, 70%, or 40% of the skill's baseline for None, Beginner, or Intermediate, rounded up. Proficient requires no allocated learning time. Projects are estimated at 8, 16, 24, and 40 hours; completed projects leave the remaining schedule without changing skill ratings.

Each role has a conservative linear prerequisite path through three foundational, three core, and three advanced skills. The topological sorter supports branching graphs if the catalog is extended. These editorial learning sequences are not a claim that all adjacent topics are absolute professional dependencies. Hours are planning estimates, not validated predictions.

The scheduler never truncates work to fit the target. It packs tasks sequentially up to the weekly limit and includes any necessary overflow weeks. Target weeks beyond the required schedule are explicitly reported as review/practice buffer. Inputs support 1–80 whole hours per week and 1–104 target weeks.

## Files

- `src/data.js`, `src/catalog-a.js`, `src/catalog-b.js`: fully populated catalog, aliases, and project requirements.
- `src/engine.js`: dependency ordering, gap analysis, and scheduling.
- `src/main.jsx`: application navigation, export, backup, and restore.
- `src/Explorer.jsx`: searchable career catalog, bookmarks, and comparisons.
- `src/Workspace.jsx`: assessment, roadmap, projects, timetable, and notes.
- `src/ui.jsx`: shared presentation and accessible dialogs.
- `src/storage.js`: migration, validation, and safe local persistence.
- `src/styles.css`: Tailwind integration and responsive design.
- `tests/engine.test.js`: catalog integrity and scheduling invariants across all tracks.
- `tests/ui.test.jsx`: DOM integration tests for user workflows.
- `scripts/catalog-report.mjs`: prints current catalog totals by field.

Assessments, notes, favorites, and project completion stay in this browser's local storage. Reset clears only the selected role’s skill ratings and can be undone. If storage is unavailable, the app remains usable for the session and displays a notice. Download a JSON backup to preserve or transfer your workspace; Markdown export is a readable plan rather than a restorable backup. No analytics, external AI calls, API keys, or account are required.
