# Linear Tasks — Matt Banton Portfolio (Phase 1)
> Tasks start at MAT-5. Phase 1 = public site only. No client management, no portal wiring, no ISR webhooks.
> Design tokens come from the Variants style guide export — do not invent values.

---

## MAT-5 · Project Initialisation

**Priority:** Urgent
**Labels:** Setup
**Status:** Todo

### Description
Scaffold the Next.js 15 project with the full Phase 1 stack. Ends when `pnpm dev` runs and `pnpm build` passes clean with zero TypeScript errors.

### Blockers (must be ready before coding starts)
- [ ] Supabase project provisioned → URL + anon key available
- [ ] Domain confirmed (mattbanton.com or new)
- [ ] Variants design export ready (palette, fonts, spacing)
- [ ] Content inventory received from Matt (bio, project list, social handles)
- [ ] Gallery decision confirmed: single page or collections?
- [ ] Lightbox decision confirmed: yes or no?

### Sub-tasks
- [x] Create Next.js 15 app: `pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"`
- [x] Verify `tsconfig.json` has `"strict": true`
- [x] Install core dependencies:
  ```
  pnpm add framer-motion react-hook-form @hookform/resolvers zod
  pnpm add @supabase/supabase-js @supabase/ssr
  pnpm add clsx tailwind-merge
  ```
- [x] Initialise shadcn/ui: `pnpm dlx shadcn@latest init` (select neutral base colour, CSS variables on)
- [x] Add shadcn primitives needed: `button`, `input`, `textarea`, `label`
- [x] Create folder structure:
  ```
  src/
    app/
      api/submit-form/
      api/revalidate/
      projects/[slug]/
      gallery/
      about/
      contact/
    components/
      layout/
      sections/
      projects/
      gallery/
      about/
      ui/        ← shadcn output, do not edit
    lib/
      supabase/
    types/
    utils/
  ```
- [x] Add `.env.local` with placeholder keys:
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  NEXT_PUBLIC_SITE_URL=
  ```
- [x] Confirm `pnpm dev` starts on `localhost:3000`
- [x] Confirm `pnpm build` passes with no errors

---

## MAT-6 · Design Foundation

**Priority:** Urgent
**Labels:** Design · Setup
**Status:** Todo

### Description
Translate the Variants style guide export into code: CSS custom properties, font setup, and Tailwind v4 config. This is the single source of truth for all visual tokens — no raw hex values anywhere else.

### Blockers
- Variants export must be finalised before this task starts

### Sub-tasks
- [ ] `src/app/globals.css` — define all CSS custom properties from Variants export:
  ```css
  :root {
    --color-bg: ;           /* near-white — from Variants */
    --color-surface: ;      /* light grey — from Variants */
    --color-text: ;         /* near-black — from Variants */
    --color-text-muted: ;   /* mid-grey — from Variants */
    --color-border: ;       /* light grey — from Variants */
    --color-accent: ;       /* black — from Variants */
    --font-display: ;       /* serif display — from Variants */
    --font-body: ;          /* sans-serif body — from Variants */
  }
  ```
- [ ] Add font files to `public/fonts/` or configure `next/font` — match Variants font choices exactly
- [ ] Wire fonts in `app/layout.tsx` via CSS variables (not className-based)
- [ ] Configure Tailwind CSS v4 to reference CSS custom properties (via `@theme` in globals.css)
- [ ] Set base styles in `globals.css`: body background, text colour, font-family defaults
- [ ] Visual smoke test: render a heading + paragraph in the browser and confirm tokens applied

---

## MAT-7 · Supabase + Data Layer

**Priority:** High
**Labels:** Backend · Database
**Status:** Todo

### Description
Database schema, TypeScript types, Supabase client setup, and all query functions. Every Supabase read for Phase 1 is written here and nowhere else. `pnpm build` must stay clean after this task.

### Sub-tasks

#### Supabase migrations
- [ ] `site_settings` — `site_name`, `tagline`, `bio_short`, `contact_email`, `location`, `availability_status`, `resume_url`, `og_image_url`, `seo_title`, `seo_description`, `social_instagram`, `social_linkedin`, `social_twitter`, `analytics_id`
- [ ] `nav_items` — `id`, `label`, `url`, `order`, `is_external`
- [ ] `projects` — `id`, `slug`, `title`, `category`, `cover_image_url`, `year`, `client` (nullable), `description`, `is_featured`, `is_published`, `order`
- [ ] `project_images` — `id`, `project_id`, `image_url`, `caption` (nullable), `order`
- [ ] `gallery_images` — `id`, `collection_id` (nullable), `image_url`, `caption` (nullable), `alt_text`, `is_published`, `order`
- [ ] `gallery_collections` — `id`, `slug`, `title`, `description` (nullable), `cover_image_url`, `is_published`, `order`
- [ ] `about_content` — `headline`, `bio_body` (HTML text), `profile_image_url`, `approach_text` (nullable), `resume_url` (nullable)
- [ ] `form_submissions` — `id`, `name`, `email`, `subject` (nullable), `message`, `submitted_at`
- [ ] RLS: all tables allow public `SELECT`; only `form_submissions` allows public `INSERT`; no `UPDATE` or `DELETE` for anon

#### TypeScript types — `src/types/content.ts`
- [ ] `SiteSettings` interface
- [ ] `NavItem` interface
- [ ] `Project` interface
- [ ] `ProjectImage` interface
- [ ] `GalleryImage` interface
- [ ] `GalleryCollection` interface
- [ ] `AboutContent` interface

#### Supabase clients — `src/lib/supabase/`
- [ ] `server.ts` — `createServerClient()` using `@supabase/ssr`, anon key only, for Server Components and Route Handlers
- [ ] `client.ts` — `createBrowserSupabase()` using `@supabase/ssr`, for contact form client component only

#### Query functions — `src/lib/queries.ts`
- [ ] `getSiteSettings(): Promise<SiteSettings>`
- [ ] `getNavItems(): Promise<NavItem[]>`
- [ ] `getFeaturedProjects(): Promise<Project[]>`
- [ ] `getAllProjects(): Promise<Project[]>`
- [ ] `getProjectCategories(): Promise<string[]>` — distinct categories, data-driven
- [ ] `getProjectBySlug(slug: string): Promise<Project | null>`
- [ ] `getProjectSlugs(): Promise<string[]>` — for `generateStaticParams`
- [ ] `getProjectImages(projectId: string): Promise<ProjectImage[]>`
- [ ] `getGalleryImages(): Promise<GalleryImage[]>`
- [ ] `getGalleryCollections(): Promise<GalleryCollection[]>` — for Option B if in scope
- [ ] `getGalleryCollectionBySlug(slug: string): Promise<GalleryCollection | null>` — Option B
- [ ] `getGalleryImagesByCollection(collectionId: string): Promise<GalleryImage[]>` — Option B
- [ ] `getAboutContent(): Promise<AboutContent>`

#### Utils
- [ ] `src/utils/cn.ts` — `clsx` + `twMerge` helper
- [ ] `src/utils/date.ts` — `formatYear(date: string): string`

#### Verify
- [ ] `pnpm build` passes clean after all types and queries are in place

---

## MAT-8 · Layout Shell

**Priority:** High
**Labels:** Frontend · Layout
**Status:** Todo

### Description
Global layout: header, footer, mobile nav, root layout with Supabase-driven metadata. Server Components by default — only `NavLink` and `MobileNav` are client components.

### Sub-tasks
- [ ] `src/components/layout/NavLink.tsx` — `'use client'`: `usePathname` for active state, uses `--color-accent` for active indicator
- [ ] `src/components/layout/Header.tsx` — Server Component: fetches `getNavItems()` + `getSiteSettings()`, renders site name left + nav right, minimal styling
- [ ] `src/components/layout/MobileNav.tsx` — `'use client'`: hamburger toggle, full-screen or slide-in drawer, closes on route change
- [ ] `src/components/layout/Footer.tsx` — Server Component: fetches `getSiteSettings()`, renders name, Instagram + LinkedIn links, copyright year
- [ ] `src/app/layout.tsx`:
  - `generateMetadata()` from `getSiteSettings()` — `seo_title`, `seo_description`, `og_image_url`
  - Title template: `{ default: seo_title, template: '%s | site_name' }`
  - Header + Footer wired
  - Font CSS variables applied to `<body>`
  - `revalidate = 3600`
- [ ] `src/app/api/revalidate/route.ts` — Phase 1 stub: `GET` returns `{ revalidated: false, message: 'Phase 2' }` with status 200

---

## MAT-9 · Home Page

**Priority:** High
**Labels:** Frontend · Page
**Status:** Todo

### Description
Four sections using the Server shell + Client animation wrapper pattern throughout. Framer Motion: `opacity 0→1`, `y 20px→0`, duration ~0.5s on scroll entry. No parallax. No scroll-jacking.

### Sub-tasks
- [ ] `src/components/sections/HeroSection.tsx` — Server shell: receives `SiteSettings` + hero image URL as props, renders `HeroSectionClient`
- [ ] `src/components/sections/HeroSectionClient.tsx` — `'use client'`: full-viewport image, site name, tagline, Framer Motion fade-in
- [ ] `src/components/sections/FeaturedProjectsSection.tsx` + `FeaturedProjectsSectionClient.tsx` — 3–4 featured projects in a clean grid; each card: cover image, title, category; image hover scale `1.0 → 1.02`
- [ ] `src/components/sections/AboutTeaser.tsx` + `AboutTeaserClient.tsx` — portrait, `bio_short` from `SiteSettings`, link to `/about`
- [ ] `src/components/sections/CTAStrip.tsx` + `CTAStripClient.tsx` — `availability_status` text from `SiteSettings`, link to `/contact`
- [ ] `src/app/page.tsx` — Server Component: fetches `getSiteSettings()` + `getFeaturedProjects()`, passes to sections, `export const revalidate = 3600`

---

## MAT-10 · Projects

**Priority:** High
**Labels:** Frontend · Page
**Status:** Todo

### Description
Projects listing with data-driven category filter, and individual project detail pages. `generateStaticParams` on `[slug]`. Categories come from Supabase — no hardcoded strings.

### Sub-tasks

#### Listing page
- [ ] `src/components/projects/ProjectCard.tsx` — cover image (consistent aspect ratio via `aspect-[4/3]` or per design), title, category, year; hover scale `1.0 → 1.02`
- [ ] `src/components/projects/ProjectGrid.tsx` — responsive grid, receives filtered `Project[]` as props
- [ ] `src/components/projects/CategoryFilter.tsx` — `'use client'`: pill/tab filter; "All" + data-driven categories from `getProjectCategories()`; no hardcoded category names; manages filter state, passes filtered list to `ProjectGrid`
- [ ] `src/app/projects/page.tsx` — Server Component: fetches `getAllProjects()` + `getSiteSettings()`, passes to `CategoryFilter` + `ProjectGrid`, `revalidate = 3600`

#### Detail page
- [ ] `src/components/projects/ProjectHero.tsx` — large cover image, project title, metadata strip: category · year · client (if set)
- [ ] `src/components/projects/ProjectImageGallery.tsx` — ordered `ProjectImage[]`, full-width images, no lightbox (images large inline), gap between images
- [ ] `src/components/projects/ProjectInfo.tsx` — description, role if set, deliverables if set — lightweight, not a UX case study
- [ ] `src/app/projects/[slug]/page.tsx` — `generateStaticParams` using `getProjectSlugs()`, `notFound()` for invalid slugs, fetches `getProjectBySlug()` + `getProjectImages()`, generates per-slug metadata, `revalidate = 3600`

---

## MAT-11 · Gallery

**Priority:** Medium
**Labels:** Frontend · Page
**Status:** Todo

### Description
Personal photo gallery. Option A (single page) or Option B (collections) — decision must be confirmed before build. Data model supports both.

### Blockers
- Gallery structure (Option A vs B) confirmed by Matt
- Lightbox decision confirmed

### Sub-tasks
- [ ] `src/components/gallery/GalleryImageItem.tsx` — image with optional caption; lightbox trigger if in scope
- [ ] `src/components/gallery/GalleryGrid.tsx` — masonry or uniform grid per design; layout confirmed from Variants
- [ ] `src/app/gallery/page.tsx` — Server Component: fetches `getGalleryImages()`, `revalidate = 3600`

**If Option B (collections):**
- [ ] `src/components/gallery/GalleryCollectionCard.tsx` — collection cover image + title
- [ ] `src/app/gallery/[slug]/page.tsx` — `generateStaticParams`, `notFound()`, fetches collection + images, `revalidate = 3600`

**If lightbox in scope:**
- [ ] Lightbox component (`'use client'`): full-screen overlay, keyboard navigation (Escape to close, arrow keys)

---

## MAT-12 · About

**Priority:** Medium
**Labels:** Frontend · Page
**Status:** Todo

### Description
About page: portrait + headline, full HTML bio, optional approach section, info strip. Writing comes from Supabase — no hardcoded copy.

### Sub-tasks
- [ ] `src/components/about/AboutHero.tsx` — `'use client'` (animation): portrait image + `headline` from `AboutContent`
- [ ] `src/components/about/BioProse.tsx` — renders `bio_body` HTML from Supabase; use `dangerouslySetInnerHTML` (content is agency-controlled, not user input)
- [ ] `src/components/about/ApproachSection.tsx` — renders `approach_text` only if non-null; skip entirely if null
- [ ] `src/components/about/InfoStrip.tsx` — `location`, `availability_status`, `contact_email`, resume link (if `resume_url` set) — all from `SiteSettings`
- [ ] `src/app/about/page.tsx` — Server Component: fetches `getAboutContent()` + `getSiteSettings()`, all sections wired, `revalidate = 3600`

---

## MAT-13 · Contact

**Priority:** Medium
**Labels:** Frontend · Backend · Page
**Status:** Todo

### Description
Simple contact page. Server-side Zod validation. IP-based rate limit: 3 submissions per hour. Supabase insert on success. Plain email shown as fallback.

### Sub-tasks
- [ ] `src/components/sections/ContactForm.tsx` — `'use client'`: React Hook Form + Zod schema; fields: name (required), email (required), subject (optional), message (required); loading, success, and error states
- [ ] `src/app/api/submit-form/route.ts`:
  - Zod schema validation server-side (same shape as form)
  - IP extracted from `x-forwarded-for` header
  - Rate limit: in-memory map tracking submissions per IP per hour; return 429 on 4th attempt
  - On valid submission: insert into `form_submissions` via server Supabase client
  - Return 200 on success, 400 on validation error, 429 on rate limit
- [ ] `src/app/contact/page.tsx` — Server Component: fetches `getSiteSettings()` for intro text + contact email; renders `ContactForm` + plain `contact_email` fallback; `revalidate = 3600`
- [ ] Manual test: submit form → row appears in Supabase `form_submissions`
- [ ] Manual test: 4th submission within 1 hour → 429 response shown in UI

---

## MAT-14 · SEO + Sitemap

**Priority:** Medium
**Labels:** SEO
**Status:** Todo

### Description
All metadata from Supabase. No hardcoded meta tags. Sitemap covers all static and dynamic routes.

### Sub-tasks
- [ ] `src/app/sitemap.ts` — fetches `getProjectSlugs()` (and collection slugs if Option B) and generates entries for: `/`, `/projects`, `/projects/[slug]` × all slugs, `/gallery`, `/about`, `/contact`; uses `NEXT_PUBLIC_SITE_URL` as base
- [ ] `src/app/robots.ts` — allow all, references `NEXT_PUBLIC_SITE_URL/sitemap.xml`
- [ ] Verify `app/layout.tsx` `generateMetadata()` covers: `title`, `description`, `openGraph.images` (from `og_image_url`)
- [ ] `app/projects/[slug]/page.tsx` — `generateMetadata()` per project: title from `project.title`, description from `project.description`, OG image from `project.cover_image_url`
- [ ] OG image URL populated in `site_settings` in Supabase
- [ ] Smoke test: `curl localhost:3000/sitemap.xml` returns valid XML

---

## MAT-15 · Deploy

**Priority:** High
**Labels:** DevOps · Deploy
**Status:** Todo

### Description
Production deployment on Vercel. Custom domain via Cloudflare. No Phase 2 env vars added — leave those fields blank.

### Sub-tasks
- [ ] Vercel project created, linked to GitHub repo (`matt-banton-site`)
- [ ] Environment variables set in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL` (set to Vercel preview URL initially)
- [ ] Initial deploy passes — no build errors
- [ ] Custom domain added in Vercel
- [ ] DNS records added in Cloudflare (CNAME → `cname.vercel-dns.com`)
- [ ] HTTPS confirmed on custom domain
- [ ] `NEXT_PUBLIC_SITE_URL` updated to final domain URL, redeployed
- [ ] Supabase RLS verified in production: public reads work, `form_submissions` insert works, no other anon writes
- [ ] Phase 2 env vars intentionally omitted: `AGENCY_API_URL`, `AGENCY_CLIENT_ID`, `AGENCY_MANAGEMENT_TOKEN`, `REVALIDATE_SECRET`

---

## MAT-16 · QA

**Priority:** High
**Labels:** QA
**Status:** Todo

### Description
Full QA pass against live production URL. Lighthouse targets: Performance 90+, Accessibility 90+, SEO 95+. Sign-off from Matt required before this task closes.

### Sub-tasks

#### Content
- [ ] All pages render live Supabase content — zero hardcoded strings in components
- [ ] All project slugs resolve; invalid slug returns 404

#### Responsive
- [ ] Mobile 375px — all pages, all interactive elements
- [ ] Tablet 768px — layout and grid checks
- [ ] Desktop 1280px+ — spacing and typography confirm to design

#### Performance
- [ ] Lighthouse: Performance 90+ on Home, Projects, About
- [ ] Lighthouse: Accessibility 90+ on all pages
- [ ] Lighthouse: SEO 95+ on all pages
- [ ] No layout shift on image load (use `next/image` with explicit dimensions everywhere)
- [ ] Framer Motion animations: smooth on scroll, no jank, no parallax

#### Contact form
- [ ] Successful submission saves row to `form_submissions` in Supabase
- [ ] 4th submission within 1 hour returns rate limit error shown in UI
- [ ] Zod validation rejects missing required fields with correct messages

#### SEO
- [ ] `/sitemap.xml` returns valid XML with all routes
- [ ] `/robots.txt` accessible
- [ ] OG image preview correct at opengraph.xyz
- [ ] Nav active states correct on all routes

#### Sign-off
- [ ] Matt reviews site on mobile and desktop
- [ ] Final approval from Matt
