import { createServerSupabase } from '@/lib/supabase/server'
import type {
  SiteSettings,
  NavItem,
  Project,
  ProjectImage,
  GalleryImage,
  GalleryCollection,
  AboutContent,
} from '@/types/content'

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .single()
  if (error) throw new Error(`getSiteSettings: ${error.message}`)
  return data as SiteSettings
}

export async function getNavItems(): Promise<NavItem[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .order('order', { ascending: true })
  if (error) throw new Error(`getNavItems: ${error.message}`)
  return (data ?? []) as NavItem[]
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .eq('is_published', true)
    .order('order', { ascending: true })
  if (error) throw new Error(`getFeaturedProjects: ${error.message}`)
  return (data ?? []) as Project[]
}

export async function getAllProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('order', { ascending: true })
  if (error) throw new Error(`getAllProjects: ${error.message}`)
  return (data ?? []) as Project[]
}

export async function getProjectCategories(): Promise<string[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('category')
    .eq('is_published', true)
  if (error) throw new Error(`getProjectCategories: ${error.message}`)
  const unique = Array.from(new Set((data ?? []).map((r) => r.category as string)))
  return unique
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()
  if (error) throw new Error(`getProjectBySlug: ${error.message}`)
  return data as Project | null
}

export async function getProjectSlugs(): Promise<string[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('is_published', true)
  if (error) throw new Error(`getProjectSlugs: ${error.message}`)
  return (data ?? []).map((r) => r.slug as string)
}

export async function getProjectImages(projectId: string): Promise<ProjectImage[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', projectId)
    .order('order', { ascending: true })
  if (error) throw new Error(`getProjectImages: ${error.message}`)
  return (data ?? []) as ProjectImage[]
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('is_published', true)
    .order('order', { ascending: true })
  if (error) throw new Error(`getGalleryImages: ${error.message}`)
  return (data ?? []) as GalleryImage[]
}

export async function getGalleryCollections(): Promise<GalleryCollection[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('gallery_collections')
    .select('*')
    .eq('is_published', true)
    .order('order', { ascending: true })
  if (error) throw new Error(`getGalleryCollections: ${error.message}`)
  return (data ?? []) as GalleryCollection[]
}

export async function getGalleryCollectionBySlug(
  slug: string
): Promise<GalleryCollection | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('gallery_collections')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()
  if (error) throw new Error(`getGalleryCollectionBySlug: ${error.message}`)
  return data as GalleryCollection | null
}

export async function getGalleryImagesByCollection(
  collectionId: string
): Promise<GalleryImage[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('collection_id', collectionId)
    .eq('is_published', true)
    .order('order', { ascending: true })
  if (error) throw new Error(`getGalleryImagesByCollection: ${error.message}`)
  return (data ?? []) as GalleryImage[]
}

export async function getAboutContent(): Promise<AboutContent> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .limit(1)
    .single()
  if (error) throw new Error(`getAboutContent: ${error.message}`)
  return data as AboutContent
}
