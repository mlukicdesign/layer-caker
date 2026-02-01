# Sanity Base: AI Copilot Instructions

## Project Overview

**Stack:** Next.js 16 (App Router) + Sanity CMS + Embedded Studio + Live Content API

This is a **unified monolith** where Sanity Studio is embedded at `/app/studio/[[...tool]]/page.tsx` and the frontend is in `src/app/(frontend)/`. All data flows from Sanity via Live Content API (`defineLive`), enabling real-time updates and Visual Editing support.

This project serves as a robust base solution for content-driven websites, blogs, and marketing sites with a flexible page builder system.

## Architecture Essentials

### 1. Data Flow Pattern

- **Sanity Schema** (`src/sanity/schemaTypes/`) → **GROQ Queries** (`src/sanity/lib/queries.ts`) → **Live Fetch** (`sanityFetch`) → **React Components** (`src/components/`)
- All queries use `defineQuery` for type safety and caching
- Live Content API is wired in `src/sanity/lib/live.ts` and rendered in `src/app/(frontend)/layout.tsx`
- **Draft Mode** enabled via `/api/draft-mode/{enable,disable}` for visual editing

### 2. Page Builder Pattern

Pages use a flexible **page builder array** (`content` field) composed of reusable blocks:

```
pageBuilderType = array of: hero, features, splitImage (objects, not references)
→ Rendered by PageBuilder component with `useOptimistic` for live updates
→ Each block has _type (route), _key (React key), and component mapping
```

**Location:** [src/components/page-builder.tsx](src/components/page-builder.tsx)

**Add new blocks:**

1. Create schema object in `src/sanity/schemaTypes/blockSchemas/{blockName}Type.ts`
2. Add to `pageBuilderType.of[]` in [src/sanity/schemaTypes/pageBuilderType.ts](src/sanity/schemaTypes/pageBuilderType.ts)
3. Create React component in `src/components/blocks/{blockName}.tsx`
4. Add mapping in PageBuilder switch statement

### 3. Key File Organization

| Path                                   | Purpose                                          |
| -------------------------------------- | ------------------------------------------------ |
| `src/sanity/schemaTypes/`              | All Sanity schema definitions                    |
| `src/sanity/schemaTypes/blockSchemas/` | Page builder block types                         |
| `src/sanity/lib/queries.ts`            | GROQ queries with `defineQuery`                  |
| `src/sanity/lib/live.ts`               | Live Content API setup                           |
| `src/sanity/types.ts`                  | **Auto-generated** TypeScript types (never edit) |
| `src/components/page-builder.tsx`      | Dynamic block renderer with optimistic updates   |
| `src/components/blocks/`               | Individual block components                      |
| `src/app/(frontend)/`                  | Public frontend pages                            |
| `src/app/api/draft-mode/`              | Draft mode enable/disable for visual editing     |

## Critical Development Workflows

### Pre-commit: Generate Type Definitions

```bash
pnpm run typegen  # Regenerates src/sanity/types.ts from schema
```

This runs **before dev and build**. If you modify any schema, types are auto-synced. Never edit `types.ts` directly.

### Development Loop

```bash
pnpm dev           # Starts Next.js + embedded Studio at /studio
pnpm run typegen   # Sync schema → TypeScript types
pnpm build         # Production build
```

### Schema Changes → TypeScript Types

1. Edit schema in `src/sanity/schemaTypes/`
2. Save (or manually run `pnpm run typegen`)
3. Types in `src/sanity/types.ts` auto-update
4. Use new types in GROQ results immediately

## Critical Patterns & Conventions

### 1. Sanity Studio Configuration

- **Embedded at:** `src/app/studio/[[...tool]]/page.tsx`
- **Config:** `sanity.config.ts` (project root)
- **Plugins:** Vision (GROQ), Presentation (Visual Editing), Media plugin, Assist (AI)
- **Structure:** [src/sanity/structure.ts](src/sanity/structure.ts) organizes desk layout

### 2. Live Content API (The Heart of Real-Time)

- `sanityFetch` from `src/sanity/lib/live.ts` automatically:
  - Caches with revalidation
  - Pushes updates to browser in real-time
  - Enables visual editing without page refresh
- **Requirements:**
  - `<SanityLive />` must render in root layout (already in [src/app/(frontend)/layout.tsx](<src/app/(frontend)/layout.tsx>))
  - `SANITY_API_READ_TOKEN` env var set (browserToken + serverToken)
  - Draft mode enabled for visual editing

### 3. GROQ Query Conventions

- Always wrap projections in `defineQuery()` for type safety
- Use `coalesce()` for fallback fields
- Reference expansion: `author->{ name, image }` (single) vs `categories[]->{}` (array)
- Example: [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts) shows POST_QUERY and PAGE_QUERY patterns

### 4. Component Props & Rendering

- Page builder blocks receive `Partial<BlockType>` and `_key` for React
- Use `createDataAttribute()` from `next-sanity` for visual editing clickability
- Optimistic updates in PageBuilder via `useOptimistic` hook (handles editor -> browser sync)

### 5. SEO & Metadata

- Each document type (post, page) has nested `seo` field with title, description, image, noIndex
- Queries use `coalesce(seo.title, title, "")` to fall back to default
- Populate via [src/sanity/schemaTypes/seoType.ts](src/sanity/schemaTypes/seoType.ts)

### 6. Navigation & Redirects

- Nested navigation structure: [src/sanity/schemaTypes/navigation.ts](src/sanity/schemaTypes/navigation.ts)
- Redirects fetch at build time in [next.config.ts](next.config.ts) via `fetchRedirects()`
- Both support references to pages and posts

## Common Tasks

### Add a New Page Type

1. Create schema in `src/sanity/schemaTypes/`
2. Add to index in [src/sanity/schemaTypes/index.ts](src/sanity/schemaTypes/index.ts)
3. Add query in [src/sanity/lib/queries.ts](src/sanity/lib/queries.ts) (use `defineQuery`)
4. Run `pnpm run typegen`
5. Create route in `src/app/(frontend)/` using `sanityFetch()`

### Add a New Block

1. Create schema in `src/sanity/schemaTypes/blockSchemas/{name}Type.ts` (use preview pattern)
2. Add `defineArrayMember({ type: "{name}" })` to pageBuilderType
3. Create component in `src/components/blocks/{name}.tsx` with createDataAttribute
4. Add to PageBuilder switch statement
5. Run `pnpm run typegen`

### Debug Real-Time Updates

- Check browser console for `[Sanity Live]` messages
- Verify token is set: `echo $SANITY_API_READ_TOKEN`
- Test draft mode at `/api/draft-mode/enable`
- Use Sanity Vision plugin (at `/studio`) to test GROQ queries

## Deployment & Environment

- **Prod:** Set `SANITY_API_READ_TOKEN`, `SANITY_PROJECT_ID`, `SANITY_DATASET` in build env
- **Preview:** Draft mode enabled on `/api/draft-mode/enable` (used by Sanity Presentation tool)
- **CORS:** If moving Studio to separate host, add to Sanity project settings
- **Images:** Sanity CDN (`cdn.sanity.io`) pre-configured in [next.config.ts](next.config.ts)

## References

- **Live Content API:** [next-sanity docs](https://github.com/sanity-io/next-sanity#live-content-api)
- **Sanity TypeGen:** `src/sanity/types.ts` (auto-generated from schema)
- **Existing Cursor Rules:** See `.cursor/rules/sanity-nextjs/` and `sanity-page-builder/` for deeper integration patterns
- **Vision Plugin:** Test queries directly at `/studio` using Vision tool
