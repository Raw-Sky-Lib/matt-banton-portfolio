import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/content'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] bg-[var(--color-surface)]">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-surface)]" />
        )}
      </div>

      {/* Meta */}
      <div className="pt-4">
        <p className="project-card-meta">
          {project.category}
          {project.client ? ` · ${project.client}` : ''}
          {` · ${project.year}`}
        </p>
        <h3 className="project-card-title mt-1">{project.title}</h3>
      </div>
    </Link>
  )
}
