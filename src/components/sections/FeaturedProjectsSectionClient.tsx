'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types/content'

const MotionLink = motion.create(Link)

const ease = [0.32, 0.72, 0, 1] as const
const ctaTrans        = { duration: 0.28, ease }
const ctaDefaultLayer = { rest: { y: '0%'   }, hover: { y: '-100%' } }
const ctaHoverLayer   = { rest: { y: '100%' }, hover: { y: '0%'    } }
const navText = 'whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em]'

// 12-col span cycle: row1=[8,4], row2=[4,8], row3=[6,6]
const SPAN_PATTERN = [8, 4, 4, 8, 6, 6] as const
type Span = 4 | 6 | 8

// Full class strings so Tailwind v4's scanner picks them up at build time
const SPAN_CLASSES: Record<Span, string> = {
  4: 'col-span-12 md:col-span-4',
  6: 'col-span-12 md:col-span-6',
  8: 'col-span-12 md:col-span-8',
}
const ASPECT_CLASSES: Record<Span, string> = {
  4: 'aspect-[3/4]',
  6: 'aspect-[4/3]',
  8: 'aspect-[16/10]',
}
const SIZES_MAP: Record<Span, string> = {
  4: '(max-width: 768px) 100vw, 33vw',
  6: '(max-width: 768px) 100vw, 50vw',
  8: '(max-width: 768px) 100vw, 66vw',
}

function ArrowUpRight() {
  return (
    <svg
      width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function formatProjectIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function FeaturedCard({
  project,
  span,
  index,
}: {
  project: Project
  span: Span
  index: number
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="featured-project-card group block">
      <div className={`featured-project-media ${ASPECT_CLASSES[span]}`}>
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes={SIZES_MAP[span]}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}

        <div className="featured-project-media-overlay" />
        <div className="featured-project-media-sheen" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 md:p-6">
          <div className="min-w-0">
            <p className="featured-project-caption">
              {project.category}
              {project.client ? ` / ${project.client}` : ''}
            </p>
            <h3 className="featured-project-title">{project.title}</h3>
          </div>

          <span className="featured-project-icon shrink-0" aria-hidden>
            <ArrowUpRight />
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="featured-project-meta">
          {project.year}
          {project.client ? ` · ${project.client}` : ''}
        </p>
        <span className="featured-project-index">{formatProjectIndex(index)}</span>
      </div>
    </Link>
  )
}

export default function FeaturedProjectsSectionClient({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <div className="relative z-10 px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24 md:py-32">
      <motion.div
        className="border-t border-white/10 pt-8 md:pt-10 mb-14 md:mb-20"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="works-section-eyebrow mb-5">Featured Projects</p>
            <h2 className="works-section-heading">
              <span className="block">Selected</span>
              <span className="block">Works</span>
            </h2>
          </div>

          <MotionLink
            href="/projects"
            className="nav-link self-start lg:self-end lg:mb-1"
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <span className="nav-link-clip">
              <span className={`nav-link-spacer ${navText}`}>All Projects →</span>
              <motion.span className="nav-link-layer" variants={ctaDefaultLayer} transition={ctaTrans}>
                <span className={`nav-link-default-text-light ${navText}`}>All Projects →</span>
              </motion.span>
              <motion.span className="nav-link-layer" variants={ctaHoverLayer} transition={ctaTrans} aria-hidden>
                <span className={`nav-link-hover-text-light ${navText}`}>All Projects →</span>
              </motion.span>
            </span>
          </MotionLink>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-8 md:gap-y-16 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {projects.map((project, i) => {
          const span = SPAN_PATTERN[i % 6] as Span
          return (
            <motion.div
              key={project.id}
              className={SPAN_CLASSES[span]}
              variants={{
                hidden:  { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
              }}
            >
              <FeaturedCard project={project} span={span} index={i} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
