import { notFound } from 'next/navigation'
import { getGalleryCollectionBySlug, getGalleryCollections } from '@/lib/queries'

export const revalidate = 3600

export async function generateStaticParams() {
  const collections = await getGalleryCollections()
  return collections.map((c) => ({ slug: c.slug }))
}

export default async function GalleryCollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getGalleryCollectionBySlug(slug)
  if (!collection) notFound()

  return (
    <div className="px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24">
      <h1 className="text-huge">{collection.title}</h1>
    </div>
  )
}
