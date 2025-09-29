# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses Bun as the package manager and runtime:

- `bun install` - Install dependencies
- `bun run dev` - Start development server on http://localhost:3000
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run generate` - Generate static site

## Code Quality

- ESLint is configured with Nuxt defaults and additional plugins:
  - `perfectionist` for import/object sorting
  - Custom Vue.js rules for self-closing tags
  - TypeScript rules with some relaxed constraints
- No test framework is currently configured

## Architecture Overview

This is a Nuxt 3 application with the following key characteristics:

### UI Framework

- **shadcn/ui components** located in `./ui/` directory (Button, Card, Input, Select, etc.)
- **Tailwind CSS** with custom theme configuration using CSS variables
- **Color mode** support with system/dark/light themes
- **Radix Vue** as the underlying primitive component library

### Project Structure

- `pages/` - File-based routing with nested routes (`/controller`, `/controller/register`)
- `components/` - Custom Vue components (e.g., `MultiField.vue` for managing string arrays)
- `layouts/` - Layout components with default layout structure
- `ui/` - shadcn/ui component library (not standard `components/ui/`)
- `assets/css/` - Global styles and Tailwind configuration

### Key Features

- **Multi-field management**: Custom component for adding/removing string items with validation
- **Form handling**: User registration forms with reactive data binding
- **Section/Group management**: Interface for managing organizational units
- **Analytics integration**: Configured for Umami analytics (placeholder ID needs replacement)

### Configuration Notes

- Uses `@/ui/*` import aliases for UI components (configured in components.json)
- Nuxt modules: Tailwind, ESLint, Icon, VueUse, shadcn-nuxt, Color Mode, Image
- TypeScript enabled throughout with strict configuration
- ESLint enforces import sorting and object property sorting for consistency

### Development Patterns

- Vue 3 Composition API with `<script setup>`
- Reactive forms using `ref()` and `reactive()`
- Component props using `defineProps<T>()` with TypeScript
- Model binding with `defineModel<T>()` for two-way data flow
