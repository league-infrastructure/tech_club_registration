# Tech Club Registration - AI Agent Instructions

## Project Overview

This is a **Next.js 15 + Supabase** application for managing tech club event registrations. The project follows a **multi-metro, multi-venue event system** with comprehensive person/registration tracking, designed for the League of Amazing Programmers infrastructure.

## Critical Architecture Knowledge

### Data Model (Reference: `design/lotm-data-model-uml.mermaid`)
- **Person-centric design**: Core entity with complex registration relationships
- **Multi-tenant structure**: Events organized by Metro → Venue → Event hierarchy
- **Registration flow**: Person → Registration → RSVP (with guardian support for minors)
- **Instructor ecosystem**: InstructorAssignment → InstructorEvaluation pipeline for employment tracking
- **Marketing attribution**: UTM tracking through campaigns/flyers

### Tech Stack Specifics
- **Next.js 15** with App Router (`src/app/`) and **Turbopack** for builds
- **React 19** with TypeScript strict mode
- **Supabase** client in `src/lib/supabase.ts` using environment variables
- **Tailwind CSS v4** (note: using new CSS-first approach)
- **Railway** deployment with Nixpacks builder

## Development Workflows

### Essential Commands
```bash
npm run dev          # Development with Turbopack
npm run build        # Production build with Turbopack
npm start           # Production server
```

### Database Setup Pattern
- **Manual SQL execution** in Supabase SQL Editor (not migrations)
- Schema defined in `docs/setup.md` starting at line ~88
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Deployment
- **Railway** auto-deploys from `railway.json` config
- Uses `npm run build` → `npm start` pipeline
- Restart policy: ON_FAILURE with 10 max retries

## Project-Specific Patterns

### File Organization
- **App Router only**: Pages in `src/app/` (no pages directory)
- **Centralized Supabase**: Single client export from `src/lib/supabase.ts`
- **Documentation-driven**: Setup instructions in `docs/setup.md` (300+ lines)
- **Design artifacts**: Mermaid diagrams in `design/` directory

### Code Conventions
- **TypeScript strict**: All files use `.tsx`/`.ts` extensions
- **Tailwind utility-first**: No custom CSS modules, uses `globals.css`
- **Environment-first config**: Supabase credentials via Next.js public env vars
- **Metadata exports**: SEO handled via Next.js metadata API in layouts

## Integration Points

### Supabase Integration
- **Client-side only**: Uses anon key (no server-side auth yet)
- **Direct queries**: No ORM, raw Supabase client calls expected
- **Real-time capabilities**: Supabase subscriptions available but not implemented

### External Dependencies
- **Railway platform**: Deploy configuration in `railway.json`
- **Supabase platform**: Database, auth, and API backend
- **Next.js 15 features**: Leverages latest App Router and React 19

## Key Implementation Notes

- Project is in **early stage**: Currently shows Next.js welcome page
- **Complex domain model**: 13+ entities with intricate relationships (see Mermaid diagram)
- **Multi-role system**: Students, instructors, guardians, evaluators, coordinators
- **Geographic organization**: Metro-based event distribution system
- **Employment pipeline**: Volunteer → evaluation → hiring workflow built into data model

When working on this codebase:
1. **Reference the Mermaid diagram** for data relationships before adding features
2. **Use Turbopack flags** in npm scripts (already configured)
3. **Follow the established Supabase client pattern** in `src/lib/supabase.ts`
4. **Check `docs/setup.md`** for database schema and setup procedures
5. **Consider multi-metro context** when building features (metro-scoped data)