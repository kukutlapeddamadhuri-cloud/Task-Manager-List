# replit.md

## Overview

A full-stack productivity application featuring a todo list manager with mini-games. Built with React frontend and Express backend, using PostgreSQL for data persistence. The app allows users to create, complete, and delete tasks while tracking progress, with an option to take breaks playing simple games like Tic Tac Toe.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Build Tool**: Vite with hot module replacement
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **API Design**: RESTful endpoints with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution, Vite middleware for HMR in development
- **Production Build**: esbuild bundles server code, Vite builds client assets

### Shared Code Pattern
- `shared/schema.ts`: Drizzle table definitions and Zod schemas for type-safe data validation
- `shared/routes.ts`: API route definitions with method, path, input/output schemas - acts as a contract between frontend and backend

### Data Flow
1. Frontend components use custom hooks (`use-todos.ts`) that wrap TanStack Query
2. Hooks call API endpoints defined in `shared/routes.ts`
3. Express routes validate input with Zod and delegate to storage layer
4. Storage layer uses Drizzle ORM to interact with PostgreSQL
5. Response flows back through the same path with type safety maintained throughout

### Database Schema
- Single `todos` table with: `id` (serial primary key), `text` (required string), `completed` (boolean, defaults false)
- Schema defined using Drizzle's pgTable, with insert schema auto-generated via drizzle-zod

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle Kit**: Database migrations stored in `./migrations` directory, push with `npm run db:push`

### UI Component Library
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Underlying headless UI components (dialogs, dropdowns, tooltips, etc.)
- **Lucide React**: Icon library

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, and dev banner for Replit environment
- **Google Fonts**: Inter (body text) and Outfit (display/headings)