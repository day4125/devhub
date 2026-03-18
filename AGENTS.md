# AGENTS.md

## Instruction Priority

These instructions override default behavior.

## Project Context

DevHub is a collection of small, independent developer tools.

Each tool should be simple, self-contained, and consistent with existing UI.

---

## Core Rules (HIGH PRIORITY)

- UI text MUST be in Swedish
- Code (variables, comments) MUST be in English
- MUST work fully offline
- Do NOT use network requests
- Do NOT send any data externally

---

## Tech Constraints

- Use ONLY: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Do NOT use frameworks (React, Vue, Angular, etc.)
- Do NOT add external libraries

---

## File Responsibilities

- `index.html`: Structure ONLY (no JS logic)
- `style.css`: Styling ONLY
- `script.js`: ALL logic

Do NOT mix responsibilities.

---

## Tool Generation Rules

- Each tool MUST be self-contained
- Do NOT refactor or modify existing tools unless necessary
- Do NOT redesign existing UI
- Match existing layout, spacing, and components
- Keep implementation simple and readable

---

## UI Behavior

- Follow existing UI patterns exactly
- Reuse existing classes and styles when possible
- Ensure responsive layout (mobile + desktop)

---

## Code Style

- Prefer small, simple functions
- Avoid unnecessary abstractions
- Do NOT overengineer

---

## Safety Rules

- Only change what is required for the task
- Do NOT touch unrelated code
- Do NOT introduce breaking changes
- Do NOT rename existing classes, IDs, or functions

---

## Feature Fit

- New tools MUST fit the "developer utility" concept
- Avoid adding features outside this scope
