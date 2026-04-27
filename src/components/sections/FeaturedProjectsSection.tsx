import type { Project } from '@/types/content'
import FeaturedProjectsSectionClient from './FeaturedProjectsSectionClient'

export default function FeaturedProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="works-section">
      <div className="works-section-glow works-section-glow-left" aria-hidden />
      <div className="works-section-glow works-section-glow-right" aria-hidden />
      <FeaturedProjectsSectionClient projects={projects} />
    </section>
  )
}
