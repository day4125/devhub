# AGENTS.md

## Project Context

DevHub is a collection of small developer tools (Text Manipulator, Diff Checker, Color Picker).

## Core Rules (HIGH PRIORITY)

- UI text MUST be in Swedish.
- Code (variables, comments, commit messages) MUST be in English.
- MUST work offline. Do NOT introduce network requests.
- Do NOT send any user data externally.

## Tech Constraints

- Use ONLY: HTML5, CSS3, Vanilla JavaScript (ES6+)
- Do NOT use frameworks (React, Vue, Angular, etc.)
- Do NOT add external dependencies unless explicitly asked

## File Responsibilities

- `index.html`: Structure ONLY (no logic)
- `style.css`: Styling and themes ONLY
- `script.js`: ALL application logic

Do NOT mix responsibilities between files.

## Styling Rules

- Use CSS variables for theming (`:root` and `[data-theme="dark"]`)
- Maintain visual consistency with existing tools
- Must be responsive (mobile + desktop)

## Accessibility

- Include ARIA labels where relevant
- Ensure keyboard navigation works

## Feature Guidelines

- New features MUST fit the "developer tool" concept
- Keep implementations simple and readable
- Prefer small, modular functions over complex abstractions

## Behavior Guidelines

- Do NOT overengineer
- Do NOT refactor unrelated code
- Only change what is necessary for the task
