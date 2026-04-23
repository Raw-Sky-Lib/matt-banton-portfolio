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
  bio_body: string
  profile_image_url: string | null
  approach_text: string | null
  resume_url: string | null
}
