# AI Instructions / Guidelines

## Project Context
DevHub is a collection of developer tools including a Text Manipulator, Diff Checker, and Color Picker/Converter.
- **UI Language**: Swedish (Svenska)
- **Code Language**: English (Variable names, comments, commit messages)
- **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES6+)

## Architectural Guidelines
1. **Structure**: Keep logic separated.
   - `index.html`: Structure and content.
   - `style.css`: Styling and themes (Dark/Light).
   - `script.js`: Application logic.
2. **Styling**:
   - Use CSS variables for theming (located in `:root` and `[data-theme="dark"]`).
   - Ensure responsive design for mobile and desktop.
3. **Quality**:
   - Verify that new tools have consistent styling with existing ones.
   - Ensure accessibility (ARIA labels, keyboard navigation).

## User Preferences
- The user prefers to keep the code simple and vanilla (avoiding heavy frameworks unless requested).
- When adding new features, ensure they fit the "Developer Hub" theme.

## Network Security
- **Minimize Network Calls**: The application must function offline. Minimize network calls at all costs.
- **Offline First**: All features should be designed to work without an internet connection.
- **Data Privacy**: No data should be sent to external servers unless explicitly required and approved.
