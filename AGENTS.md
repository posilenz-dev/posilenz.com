# Agent Instructions

This document provides explicit rules and operational guidelines for AI agents interacting with this repository.

## Golden Rules

1. **Read `MEMORY.md` immediately**: Before starting any task or making modifications, you MUST read the `MEMORY.md` file in the root directory to understand the project architecture, tech stack, and crucial context.
2. **Keep `MEMORY.md` Updated**: Whenever you make significant architectural changes, add new dependencies, or alter core configurations, you MUST update `MEMORY.md` to ensure it remains completely in sync with the current state of the codebase.
3. **Follow Architectural Conventions**: Add new Next.js pages strictly within the `app` directory according to App Router conventions. Place new React components within their respective logical folder in `components/` (`landing`, `blog`, `careers`, or `ui`).
4. **Design & Aesthetics First**: This is a premium corporate website. When adding UI components, use GSAP for smooth micro-animations, strictly adhere to the Tailwind CSS design constraints, and utilize the existing typography (Inter and Sora). Ensure a modern, responsive feel.
5. **Use Pnpm**: The project strictly uses `pnpm`. If you need to install or remove dependencies, use `pnpm add` or `pnpm rm`. Do not use npm or yarn.
6. **No Placeholders**: When instructed to create or update content/images, use appropriate, realistic elements. Use the `generate_image` tool if practical demonstrations require distinct assets not present.
7. **Task Workflows**:
   - For complex tasks, use your `task_boundary` tool and keep users informed.
   - For backend/CMS modifications involving Keystatic, verify `keystatic.config.ts`.
   - Never commit sensitive keys or placeholder passwords to the `.env` configuration files.

## Workflow Example
1. Check `MEMORY.md`.
2. Assess existing Next.js `app/` paths and `components/`.
3. Plan structure (using `task.md` or similar AI artifacts).
4. Implement using `pnpm`, Tailwind, and TypeScript.
5. Verify changes locally.
