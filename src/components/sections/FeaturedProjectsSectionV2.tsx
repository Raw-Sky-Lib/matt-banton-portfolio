import type { Project } from '@/types/content'
import FeaturedProjectsSectionV2Client from './FeaturedProjectsSectionV2Client'

export default function FeaturedProjectsSectionV2({ projects }: { projects: Project[] }) {
  return (
    <section className="border-y border-black/10 bg-[#f4efe8] text-[#111111]">
      <FeaturedProjectsSectionV2Client projects={projects} />
    </section>
  )
}
