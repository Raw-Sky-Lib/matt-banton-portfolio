# Project Plan — Matt Banton Photography Portfolio
> Full rebuild and rebrand. Phase 1: public site.
> Last updated: April 2026

---

## Project Summary

Matt Banton is a photographer shifting his portfolio focus from architecture to people photography. His current site (mattbanton.com) is a light, editorial, no-animation site that serves as the starting point for content inventory — not design direction. This is a full rebuild with a new visual identity.

**The brief in one sentence:** A minimal, monochromatic editorial photography portfolio where the work dominates and the interface disappears.

**This site is also the agency's first showcase deployment** — it must be immaculate.

---

## Aesthetic Direction

Synthesised from Matt's references and his explicit descriptions:

### What it should feel like
- Editorial and considered — like a well-designed photography book or magazine
- Quiet and confident — the interface doesn't compete with the images
- Breathing room everywhere — generous whitespace, nothing crowded
- Typography-led — strong type hierarchy carries the non-image content
- Monochromatic shell — white, black, and grey only; the photos provide all the colour

### What it should not be
- Heavy scroll effects or parallax (explicitly flagged by Matt)
- Too many interactions or motion (flagged on lenaharrer reference)
- Cluttered or decorative — UI elements earn their presence
- Trendy or dated — aim for timeless editorial

### Reference synthesis

| Reference | What Matt takes from it |
|-----------|------------------------|
| lenaharrer.com | Quality of written content; editorial confidence; large image presentation — not the interaction density |
| offmenu.design/services | Page layout structure; clean content hierarchy; section spacing — not the interaction effects |
| mttw.studio | Overall restraint; studio-quality feel; how work is presented simply |
| alti-global.com | Everything has space to breathe; the generous padding and margin approach |
| jamesclear.com | Maximum simplicity; content-first; nothing unnecessary on the page |

### Palette
- Background: near-white (`#FAFAFA` or pure `#FFFFFF`)
- Surface: light grey (`#F4F4F4`) for subtle section differentiation
- Text: near-black (`#111111`)
- Text muted: mid-grey (`#666666` or `#888888`)
- Border/divider: light grey (`#E5E5E5`)
- Accent: black (`#000000`) — for buttons, active states, hover treatments
- No colour accents — the photographs carry all warmth and colour

### Typography direction
- **Display / headings:** A refined serif — editorial weight, high contrast, slightly condensed. Options to explore: Cormorant Garamond, Playfair Display, freight-display style
- **Body / UI:** Clean, neutral sans-serif — legible, unobtrusive. Options: Inter, DM Sans, Geist
- **Navigation:** Small caps or tracked uppercase sans-serif — understated and precise
- Confirm final choices with Matt before build starts

### Animation
- Subtle fade-in on scroll (`opacity: 0 → 1`, `y: 20px → 0`, duration ~0.5s) on all sections
- Image hover: very slight scale (`1.0 → 1.02`) or subtle brightness shift
- No parallax. No scroll-jacking. No heavy entrance choreography.
- Page transitions: none, or a simple fade if Next.js view transitions are used

---

## Page Structure

### Home `/`
**Purpose:** First impression. One dominant image. Matt's name and short positioning line. Quick entry into work.

**Sections:**
1. **Hero** — Full-viewport or near-full image (signature people shot). Matt's name. One-line positioning statement. Minimal nav visible.
2. **Selected Work** — 3–4 featured projects in a clean grid or staggered layout. Each card: image, project title, category.
3. **About Teaser** — 2–3 sentence bio excerpt + portrait. Link to full About page.
4. **CTA Strip** — Simple text CTA: "Available for projects" or similar. Link to Contact.

---

### Projects `/projects`
**Purpose:** Full portfolio grid. Category filter at top. This is the main work showcase.

**Sections:**
1. **Page header** — minimal: "Projects" label + optional short descriptor
2. **Category filter** — text-based tab/pill filter: All / People / Architecture / Editorial / (other categories TBD from Matt's actual work)
3. **Project grid** — responsive grid of project cards. Each card: cover image (consistent aspect ratio), title, category, year.

**Note:** Categories should be data-driven from Supabase so Matt can add categories without a code change.

---

### Project Detail `/projects/[slug]`
**Purpose:** Individual project / case study. Images dominate.

**Sections:**
1. **Project hero** — large cover image, project title, metadata strip (category, year, client if applicable)
2. **Image gallery** — ordered sequence of project images. Full-width or generous contained width. No lightbox required on this page — images should be large enough inline.
3. **Project info** — short description/overview, role, deliverables (keep lightweight — this is photography, not a UX case study)

---

### Gallery `/gallery` (and optionally `/gallery/[slug]`)
**Purpose:** Curated photo collections — personal/non-commissioned work. More raw and exploratory than Projects.

**Option A (single gallery):** One page, masonry or grid of images from across all personal work. Simple.
**Option B (collections):** Gallery index showing collection cards (e.g. "London 2024", "Portraits"), each linking to a dedicated collection page.

**Recommendation:** Start with Option A. Matt can decide if he wants collections later — the data model supports it either way.

---

### About `/about`
**Purpose:** Who Matt is. Personal and direct. Good writing (Matt flagged the writing quality on lenaharrer).

**Sections:**
1. **Bio** — full bio text, written well. Portrait image.
2. **Approach / philosophy** — optional short section on how Matt works and what he values
3. **Info strip** — based in [city], available for [types of work], contact email, resume/CV link (optional)

---

### Contact `/contact`
**Purpose:** Simple. Name, email, message. No clutter.

**Sections:**
1. **Short intro text** — 1–2 sentences. Warm and direct.
2. **Contact form** — name, email, subject (optional), message. Submit button.
3. **Alternate contact** — email address shown plain for those who prefer it

---

### Services `/services` *(deferred — not Phase 1)*
Skip for now. Data model should not be built around services in Phase 1. Can be added cleanly later.

---

## Updated Content Model (Photography-Specific)

This replaces the generic content model in CLAUDE.md. Update that file once this plan is confirmed.

### Supabase Tables

```
site_settings
  site_name, tagline, bio_short, contact_email, location,
  availability_status, resume_url, og_image_url, seo_title,
  seo_description, social_instagram, social_linkedin,
  social_twitter, analytics_id

nav_items
  id, label, url, order, is_external

projects
  id, slug, title, category, cover_image_url, year, client (nullable),
  description, is_featured, is_published, order

project_images
  id, project_id, image_url, caption (nullable), order

gallery_images
  id, collection_id (nullable), image_url, caption (nullable),
  alt_text, is_published, order
  — collection_id is nullable: null = ungrouped (Option A), set = belongs to collection (Option B)

gallery_collections (optional, for Option B)
  id, slug, title, description (nullable), cover_image_url,
  is_published, order

about_content
  headline, bio_body (HTML), profile_image_url, approach_text (nullable),
  resume_url (nullable)

form_submissions
  id, name, email, subject (nullable), message, submitted_at
```

### TypeScript types to update in `src/types/content.ts`

```typescript
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
  bio_body: string        // HTML
  profile_image_url: string | null
  approach_text: string | null
  resume_url: string | null
}

export interface SiteSettings {
  site_name: string
  tagline: string
  bio_short: string
  contact_email: string
  location: string | null
  availability_status: string | null   // e.g. "Available for projects"
  resume_url: string | null
  og_image_url: string | null
  seo_title: string
  seo_description: string
  social_instagram: string | null
  social_linkedin: string | null
  social_twitter: string | null
  analytics_id: string | null
}
```

---

## Build Stages

### Stage 0 — Pre-build (before any code)
- [ ] Agency-hub client record created → `client_id` and `management_token` generated
- [ ] Client Supabase project provisioned
- [ ] GitHub repo forked from `client-site` template → `matt-banton-site`
- [ ] Domain confirmed (mattbanton.com or new domain)
- [ ] Design system confirmed (Variants style guide exported)
- [ ] All design sections completed and approved before Stage 1 starts

### Stage 1 — Foundation
- [ ] Fork template, `pnpm install`, confirm `pnpm dev` starts
- [ ] `globals.css` — CSS custom properties set from confirmed design guide
- [ ] Font imports added
- [ ] Supabase migrations run and verified (all tables + RLS policies)
- [ ] `src/types/content.ts` — all interfaces matching Supabase schema
- [ ] `src/lib/queries.ts` — all query functions written
- [ ] `pnpm build` passes clean

### Stage 2 — Layout Shell
- [ ] `Header.tsx` — logo/name left, nav right, minimal
- [ ] `Footer.tsx` — minimal: name, social links, copyright
- [ ] `MobileNav.tsx` — hamburger toggle
- [ ] `NavLink.tsx` — active state
- [ ] `app/layout.tsx` — metadata from Supabase, Header + Footer wired

### Stage 3 — Home Page
- [ ] `HeroSection.tsx` + `HeroSectionClient.tsx`
- [ ] `FeaturedProjectsSection.tsx` + client
- [ ] `AboutTeaser.tsx` + client
- [ ] `CTAStrip.tsx` + client
- [ ] `app/page.tsx` — all sections wired, ISR set

### Stage 4 — Projects
- [ ] `ProjectCard.tsx`
- [ ] `ProjectGrid.tsx`
- [ ] `CategoryFilter.tsx` (`'use client'` — filter state)
- [ ] `app/projects/page.tsx`
- [ ] `ProjectHero.tsx`, `ProjectImageGallery.tsx`, `ProjectInfo.tsx`
- [ ] `app/projects/[slug]/page.tsx` — `generateStaticParams` + `notFound()`

### Stage 5 — Gallery
- [ ] `GalleryGrid.tsx` (masonry or uniform grid — confirm with design)
- [ ] `GalleryImage.tsx` (with lightbox trigger if in scope)
- [ ] `app/gallery/page.tsx`
- [ ] If collections in scope: `GalleryCollectionCard.tsx`, `app/gallery/[slug]/page.tsx`

### Stage 6 — About
- [ ] `BioProse.tsx` (renders HTML bio)
- [ ] `app/about/page.tsx`

### Stage 7 — Contact
- [ ] `ContactForm.tsx` (`'use client'`)
- [ ] `app/api/submit-form/route.ts` — Zod validation + rate limit + Supabase insert
- [ ] `app/contact/page.tsx`

### Stage 8 — SEO + Sitemap
- [ ] `app/sitemap.ts` — home, projects, project slugs, gallery, about, contact
- [ ] `app/robots.ts`
- [ ] OG image set in `site_settings`

### Stage 9 — Deploy
- [ ] Vercel project created, env vars set
- [ ] Custom domain connected via Cloudflare
- [ ] HTTPS confirmed, `NEXT_PUBLIC_SITE_URL` updated
- [ ] Redeploy after domain update

### Stage 10 — QA
- [ ] All pages render with Supabase data (no hardcoded content)
- [ ] Mobile QA at 375px and 768px
- [ ] Lighthouse: Performance 90+, Accessibility 90+, SEO 95+
- [ ] Contact form: submits, saves to Supabase, rate limit fires on 4th attempt
- [ ] All project slugs resolve correctly, `notFound()` fires for invalid slugs
- [ ] OG image preview test (opengraph.xyz)
- [ ] Sitemap accessible at `/sitemap.xml`

---

## Content Inventory — What We Need from Matt

Before Stage 0 can complete, collect the following:

### Identity
- [ ] Final site name / how he wants to be credited (e.g. "Matt Banton" / "Matt Banton Photography")
- [ ] Tagline / positioning line (1 sentence)
- [ ] Short bio for hero/teaser (2–3 sentences)
- [ ] Full bio for About page
- [ ] Profile/portrait photo (high-res)
- [ ] Location and availability statement (e.g. "Based in London. Available worldwide.")

### Projects
- [ ] List of all projects to include (title, category, year, client if creditable)
- [ ] Cover image for each project (high-res, ideally consistent aspect ratio)
- [ ] Ordered set of images per project
- [ ] Short description per project (1–2 sentences)
- [ ] Which projects should be featured on the home page (3–4 max)

### Gallery
- [ ] Decision: single gallery or collections?
- [ ] All gallery images (high-res)
- [ ] If collections: collection names and which images belong to each

### Categories
- [ ] Confirmed list of project categories (e.g. People, Architecture, Editorial, Commercial — Matt to confirm based on his actual work)

### Brand / Domain
- [ ] Domain decision (keep mattbanton.com or new one?)
- [ ] Any existing logo or wordmark, or is typography the identity?
- [ ] Font preferences or direction for the design session

### Social
- [ ] Instagram handle
- [ ] LinkedIn URL (if he wants it linked)
- [ ] Any other social links

---

## Open Questions

1. **Gallery: single page or collections?** Option A is simpler and faster to build. Recommend starting with Option A and adding collections in Phase 2 if needed.
2. **Lightbox on gallery images?** Full-screen lightbox is a common photography portfolio feature. Adds some JS complexity. Confirm with Matt.
3. **Project images: inline or lightbox?** On project detail pages, are images shown large inline, or can they be opened full-screen?
4. **Domain:** Keep mattbanton.com or start fresh?
5. **Services page:** Confirmed as deferred. Will this ever be needed, and what would it contain? (Helps plan the data model even if not built now.)
6. **Blog/writing:** Matt flagged the written content on lenaharrer as something he likes. Does he want a writing/notes section eventually?
7. **Availability status:** Should the site show "Currently available" / "Fully booked" as a dynamic status from Supabase?
