import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjectSlugs } from '@/lib/queries'

export const revalidate = 3600

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <div className="px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24">
      <h1 className="text-huge">{project.title}</h1>
    </div>
  )
}
