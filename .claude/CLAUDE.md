@AGENTS.md

# CLAUDE.md — Matt Banton Photography Portfolio
> Authoritative project context. Read before writing any code or making any architectural decision.
> Design tokens come from the Variants style guide export — do not invent values.

---

## Project Overview

**Client:** Matt Banton  
**Project type:** Personal photography portfolio — full rebranding and rebuild  
**Status:** Phase 1 in progress — public site  
**Aesthetic:** Minimal, monochromatic, editorial. The work dominates; the interface disappears.

Matt is a photographer shifting focus from architecture to people photography. This is a full rebuild — new design, new content model, new codebase.

**This is the agency's first showcase deployment.** Performance, SEO, and code quality must be immaculate.

---

## What This Is NOT

- **No client management in Phase 1** — no agency-hub wiring, no management tokens, no portal binding, no ISR webhooks
- **No services page** — deferred indefinitely
- **No blog** — deferred unless explicitly added to scope
- **No Go backend** — Next.js route handlers only

Phase 2 items (`AGENCY_API_URL`, `AGENCY_CLIENT_ID`, `AGENCY_MANAGEMENT_TOKEN`, `REVALIDATE_SECRET`) do not exist yet. Leave those env vars blank.

---

## Stack

- **Framework:** Next.js 16 (App Router) · TypeScript (strict) · React 19
- **Styling:** Tailwind CSS v4 · shadcn/ui · Radix UI
- **Database:** Supabase — anon key + RLS, public reads only
- **Animations:** Framer Motion — scroll-triggered fade-in on all sections; no parallax, no scroll-jacking
- **Forms:** React Hook Form + Zod — contact form only
- **ISR:** `export const revalidate = 3600` on all pages — on-demand webhook is Phase 2
- **Deploy:** Vercel · Supabase · Cloudflare (DNS)

---

## Aesthetic Direction

- Background: near-white · Text: near-black · Accent: black — photographs carry all colour
- Generous whitespace everywhere; nothing crowded
- Typography-led: strong editorial serif for display, clean sans-serif for body, tracked uppercase for nav
- Animation: `opacity 0→1`, `y 20px→0`, ~0.5s on scroll entry. Image hover: scale `1.0→1.02`. That's it.
- References: lenaharrer.com (editorial confidence), mttw.studio (restraint), alti-global.com (breathing room), jamesclear.com (content-first)

---

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero + featured projects + about teaser + CTA |
| Projects | `/projects` | Full project grid with category filter |
| Project detail | `/projects/[slug]` | Image gallery + project info |
| Gallery | `/gallery` | Personal/non-commissioned work |
| Gallery collection | `/gallery/[slug]` | Only if Option B (collections) confirmed |
| About | `/about` | Bio, approach, info strip |
| Contact | `/contact` | Contact form |

---

## Supabase Tables

```
site_settings
  site_name, tagline, bio_short, contact_email, location,
  availability_status, resume_url, og_image_url, seo_title,
  seo_description, social_instagram, social_linkedin,
  social_twitter, analytics_id

nav_items
  id, label, url, order, is_external

projects
  id, slug, title, category, cover_image_url, year,
  client (nullable), description, is_featured, is_published, order

project_images
  id, project_id, image_url, caption (nullable), order

gallery_images
  id, collection_id (nullable), image_url, caption (nullable),
  alt_text, is_published, order

gallery_collections   ← only if Option B confirmed
  id, slug, title, description (nullable), cover_image_url,
  is_published, order

about_content
  headline, bio_body (HTML), profile_image_url,
  approach_text (nullable), resume_url (nullable)

form_submissions
  id, name, email, subject (nullable), message, submitted_at
```

**RLS:** All tables allow public `SELECT`. Only `form_submissions` allows public `INSERT`. No anon `UPDATE` or `DELETE`.

---

## TypeScript Types — `src/types/content.ts`

```typescript
export interface SiteSettings {
  site_name: string
  tagline: string
  bio_short: string
  contact_email: string
  location: string | null
  availability_status: string | null
  resume_url: string | null
  og_image_url: string | null
  seo_title: string
  seo_description: string
  social_instagram: string | null
  social_linkedin: string | null
  social_twitter: string | null
  analytics_id: string | null
}

export interface NavItem {
  id: string
  label: string
  url: string
  order: number
  is_external: boolean
}

export interface Project {
  id: string
  slug: string
  title: string
  category: string
  cover_image_url: string | null
  year: string
  client: string | null
  description: string
  is_featured: boolean
  is_published: boolean
  order: number
}

export interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  caption: string | null
  order: number
}

export interface GalleryImage {
  id: string
  collection_id: string | null
  image_url: string
  caption: string | null
  alt_text: string
  is_published: boolean
  order: number
}

export interface GalleryCollection {
  id: string
  slug: string
  title: string
  description: string | null
  cover_image_url: string | null
  is_published: boolean
  order: number
}

export interface AboutContent {
  headline: string
  bio_body: string        // HTML — rendered via dangerouslySetInnerHTML (agency-controlled content)
  profile_image_url: string | null
  approach_text: string | null
  resume_url: string | null
}
```

---

## Folder Structure

```
src/
  app/
    page.tsx                          → Home (Server Component)
    projects/
      page.tsx                        → Projects listing
      [slug]/page.tsx                 → Project detail
    gallery/
      page.tsx                        → Gallery
      [slug]/page.tsx                 → Collection detail (Option B only)
    about/page.tsx
    contact/page.tsx
    api/
      submit-form/route.ts            → Contact form handler
      revalidate/route.ts             → Phase 1 stub — returns 200, no logic
    layout.tsx
    globals.css
  components/
    layout/
      Header.tsx                      → Server Component
      Footer.tsx                      → Server Component
      NavLink.tsx                     → 'use client' (usePathname active state)
      MobileNav.tsx                   → 'use client' (toggle state)
    sections/                         → Page sections (Server shell + Client animation wrapper)
    projects/
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectHero.tsx
      ProjectImageGallery.tsx
      ProjectInfo.tsx
      CategoryFilter.tsx              → 'use client' — filter state
    gallery/
      GalleryGrid.tsx
      GalleryImageItem.tsx
      GalleryCollectionCard.tsx       → Option B only
    about/
      AboutHero.tsx                   → 'use client' (animation)
      BioProse.tsx                    → renders HTML bio
      ApproachSection.tsx
      InfoStrip.tsx
    ui/                               → shadcn/ui primitives — do not modify
  lib/
    supabase/
      server.ts                       → createServerClient() — anon key only
      client.ts                       → createBrowserSupabase() — contact form only
    utils.ts                          → cn() helper (clsx + twMerge) — shadcn standard location
    queries.ts                        → ALL Supabase reads go here
  types/
    content.ts                        → TypeScript interfaces — must match Supabase schema exactly
  utils/
    date.ts                           → formatYear()
```

---

## Key Conventions

### Server vs Client components
- Default: Server Component — fetches data, passes as props
- `'use client'` only for: Framer Motion animations, `useState`/`useEffect`, form handlers, `usePathname`
- Never put `'use client'` on a page that only fetches data

### Section component pattern
Every page section = Server shell + Client animation wrapper:
```
HeroSection.tsx        → Server shell, no 'use client', receives props, renders HeroSectionClient
HeroSectionClient.tsx  → 'use client', Framer Motion scroll animation
```

### Query convention
All Supabase reads live in `src/lib/queries.ts` — never inline in pages or components.

```typescript
getSiteSettings(): Promise<SiteSettings>
getNavItems(): Promise<NavItem[]>
getFeaturedProjects(): Promise<Project[]>
getAllProjects(): Promise<Project[]>
getProjectCategories(): Promise<string[]>   // distinct — data-driven, no hardcoded names
getProjectBySlug(slug: string): Promise<Project | null>
getProjectSlugs(): Promise<string[]>
getProjectImages(projectId: string): Promise<ProjectImage[]>
getGalleryImages(): Promise<GalleryImage[]>
getGalleryCollections(): Promise<GalleryCollection[]>
getGalleryCollectionBySlug(slug: string): Promise<GalleryCollection | null>
getGalleryImagesByCollection(collectionId: string): Promise<GalleryImage[]>
getAboutContent(): Promise<AboutContent>
```

### CSS tokens
All colours reference CSS custom properties defined in `globals.css` — set from the Variants style guide export. No raw hex values in component files.

```
--color-bg          --color-surface
--color-text        --color-text-muted
--color-border      --color-accent
--font-display      --font-body
```

---

## SEO Pattern

All metadata from Supabase — no hardcoded meta tags.

```typescript
// app/layout.tsx
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: { default: s.seo_title, template: `%s | ${s.site_name}` },
    description: s.seo_description,
    openGraph: { images: s.og_image_url ? [s.og_image_url] : [] },
  }
}
```

Per-slug pages (`/projects/[slug]`) generate their own metadata from project data.

---

## Environment Variables

```env
# Required — Phase 1
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=

# Phase 2 only — do not add in Phase 1
# AGENCY_API_URL=
# AGENCY_CLIENT_ID=
# AGENCY_MANAGEMENT_TOKEN=
# REVALIDATE_SECRET=
```

---

## Security Rules

- `NEXT_PUBLIC_` prefix: only `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Contact form: Zod validation server-side before any Supabase write
- Rate limit contact form: 3 submissions per IP per hour — return 429 on 4th
- Use anon key + RLS only — never the service role key

---

## Do Not

- Do not hardcode any text in components — all content from Supabase
- Do not add `'use client'` to pages that only fetch data
- Do not write Supabase queries inline — all reads through `src/lib/queries.ts`
- Do not use the Supabase service role key
- Do not skip `generateStaticParams` on `/projects/[slug]` and `/gallery/[slug]`
- Do not wire Phase 2 items (portal, management token, ISR webhook) during Phase 1
- Do not use raw hex values in components — CSS custom properties only
- Do not add parallax, scroll-jacking, or heavy entrance choreography
