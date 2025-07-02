# Contributing to Prompter Framework

Thank you for taking the time to contribute! This document describes how to set up your environment, coding conventions, and the process for submitting pull requests and issues.

## Development Setup

1. Fork the repository and clone your fork.
2. Install Node.js **16 or newer**.
   - The `setup.sh` script will install Node.js if needed and run the initial setup.
3. Install dependencies:
   ```bash
   npm ci
   ```
4. Run tests, lint checks and type checks:
   ```bash
   npm test
   npm run lint
   npm run typecheck
   ```

## Coding Style

- Linting is enforced with **ESLint**. Run `npm run lint` to check your code or `npm run lint:fix` to automatically fix problems.
- **Prettier** is used for formatting. Run `npm run format` before committing or enable format-on-save in your editor.
- The default configuration uses two-space indentation, single quotes and semicolons.

## Pull Requests

- Create feature branches off the `main` branch.
- Ensure `npm test`, `npm run lint`, and `npm run typecheck` all pass before submitting.
- Add or update tests for any changes in behavior.
- Keep pull requests focused and describe the motivation and approach in the description.

## Issues

- Search existing issues before opening a new one.
- When reporting a bug, include steps to reproduce and relevant environment details.
- Feature requests and improvement suggestions are welcome. Please describe the problem the feature solves.

