'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/types/content'

const MotionLink = motion.create(Link)

const ease = [0.32, 0.72, 0, 1] as const
const ctaTrans        = { duration: 0.28, ease }
const ctaDefaultLayer = { rest: { y: '0%'   }, hover: { y: '-100%' } }
const ctaHoverLayer   = { rest: { y: '100%' }, hover: { y: '0%'    } }
const navText = 'whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em]'
const SECTION_INTRO = 'Recent projects across portraiture, editorial, and commissioned photography.'

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

function getCardLayout(index: number) {
  const pattern = [
    {
      wrapperClass: 'xl:pt-10',
      mediaClass: 'aspect-[4/5] md:aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
    },
    {
      wrapperClass: 'xl:-translate-y-6',
      mediaClass: 'aspect-[5/4] md:aspect-[6/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
    },
    {
      wrapperClass: 'xl:pt-20',
      mediaClass: 'aspect-[3/4] md:aspect-[4/5]',
      sizes: '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
    },
  ] as const

  return pattern[index % pattern.length]
}

function FeaturedCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const reduceMotion = useReducedMotion()
  const layout = getCardLayout(index)

  return (
    <MotionLink
      href={`/projects/${project.slug}`}
      className={`featured-project-card group block ${layout.wrapperClass}`}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className={`featured-project-media ${layout.mediaClass}`}>
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.title}
            fill
            sizes={layout.sizes}
            className="featured-project-image object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}

        <div className="featured-project-frame" aria-hidden />
        <div className="featured-project-media-overlay" />
        <div className="featured-project-media-sheen" />
      </div>

      <div className="featured-project-copy">
        <div className="featured-project-topline">
          <span className="featured-project-index">{formatProjectIndex(index)}</span>
          <span className="featured-project-rule" aria-hidden />
          <p className="featured-project-caption">
            {project.category}
            {project.client ? ` / ${project.client}` : ''}
          </p>
        </div>

        <h3 className="featured-project-title">{project.title}</h3>

        <div className="featured-project-row">
          <p className="featured-project-meta">
            {project.year}
            {project.client ? ` · ${project.client}` : ''}
          </p>

          <span className="featured-project-link-label">
            <span>Open project</span>
            <span className="featured-project-icon" aria-hidden>
              <ArrowUpRight />
            </span>
          </span>
        </div>
      </div>
    </MotionLink>
  )
}

export default function FeaturedProjectsSectionClient({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  return (
    <div className="relative z-10 px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24 md:py-32">
      <motion.div
        className="mb-16 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className="works-section-divider"
          variants={{
            hidden: { scaleX: 0, opacity: 0.4 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease } },
          }}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
          <div>
            <motion.p
              className="works-section-eyebrow mb-5"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              Featured Projects
            </motion.p>
            <motion.h2
              className="works-section-heading"
              variants={{
                hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
              }}
            >
              <span className="block">Selected</span>
              <span className="block">Works</span>
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-col items-start gap-6 lg:items-end"
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <p className="works-section-intro">
              {SECTION_INTRO}
            </p>

            <MotionLink
              href="/projects"
              className="nav-link"
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
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="featured-project-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={{
          hidden:  {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {projects.map((project, i) => {
          return (
            <motion.div
              key={project.id}
              variants={{
                hidden:  { opacity: 0, y: 34, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.75, ease },
                },
              }}
            >
              <FeaturedCard project={project} index={i} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
