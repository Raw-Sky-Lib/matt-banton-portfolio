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
const SECTION_INTRO = 'A brighter, more immersive showcase direction with stronger hierarchy, softer paper tones, and a cleaner sense of composition.'

function ArrowUpRight() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  )
}

function formatProjectIndex(index: number) {
  return String(index + 1).padStart(2, '0')
}

function getExcerpt(description: string) {
  const trimmed = description.trim()
  if (trimmed.length <= 150) return trimmed
  return `${trimmed.slice(0, 147).trimEnd()}...`
}

function LeadProject({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
    >
      <MotionLink
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-[34px] border border-black/10 bg-[#fbf7f1] p-4 shadow-[0_28px_80px_rgba(17,24,39,0.09)] md:p-5 xl:p-6"
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] xl:gap-8">
          <div className="relative flex min-h-full flex-col justify-between rounded-[26px] bg-[#efe7dc] px-5 py-5 md:px-6 md:py-6 xl:px-7 xl:py-7">
            <div
              className="pointer-events-none absolute right-4 top-3 text-[88px] font-bold uppercase leading-none tracking-[-0.05em] text-black/6 md:text-[120px]"
              style={{ fontFamily: 'var(--font-heading)' }}
              aria-hidden
            >
              01
            </div>

            <div className="relative z-10">
              <div className="mb-10 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-black/42">
                <span>Featured Projects / V2</span>
                <span className="h-px w-8 bg-black/15" aria-hidden />
                <span>{project.category}</span>
              </div>

              <h3
                className="max-w-[10ch] text-[clamp(34px,5vw,72px)] font-bold uppercase leading-[0.9] tracking-[0.05em] text-[#111111]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </h3>

              <p className="mt-5 max-w-[34ch] text-[15px] leading-7 text-black/58">
                {getExcerpt(project.description)}
              </p>
            </div>

            <div className="relative z-10 mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-black/10 pt-5">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">
                <span>{project.year}</span>
                {project.client ? <span>{project.client}</span> : null}
              </div>

              <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 group-hover:text-black/74">
                <span>Open project</span>
                <span className="inline-flex translate-x-[-2px] transition-transform duration-300 group-hover:translate-x-0" aria-hidden>
                  <ArrowUpRight />
                </span>
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] bg-[#ddd4c8] aspect-[16/11] md:aspect-[16/10]">
            {project.cover_image_url ? (
              <Image
                src={project.cover_image_url}
                alt={project.title}
                fill
                sizes="(max-width: 1280px) 100vw, 56vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-[#ddd4c8]" />
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-[18px] rounded-[22px] border border-white/35" />
          </div>
        </div>
      </MotionLink>
    </motion.div>
  )
}

function SecondaryProjectTile({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="col-span-12 md:col-span-6 xl:col-span-4"
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
      }}
    >
      <MotionLink
        href={`/projects/${project.slug}`}
        className="group block"
        whileHover={reduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="relative overflow-hidden rounded-[30px] bg-[#ddd4c8] aspect-[4/5]">
          {project.cover_image_url ? (
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#ddd4c8]" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-[16px] rounded-[22px] border border-white/35" />
        </div>

        <div className="px-1 pb-1 pt-5">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">
            <span>{formatProjectIndex(index + 1)}</span>
            <span className="h-px w-7 bg-black/15" aria-hidden />
            <span>{project.category}</span>
          </div>

          <h3
            className="text-[clamp(26px,2.5vw,40px)] font-bold uppercase leading-[0.95] tracking-[0.04em] text-[#111111]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.title}
          </h3>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-black/42">
              {project.year}
              {project.client ? ` · ${project.client}` : ''}
            </p>

            <span className="inline-flex items-center gap-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-black/34 transition-colors duration-300 group-hover:text-black/70">
              <span>Open project</span>
              <span className="inline-flex translate-x-[-2px] transition-transform duration-300 group-hover:translate-x-0" aria-hidden>
                <ArrowUpRight />
              </span>
            </span>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  )
}

export default function FeaturedProjectsSectionV2Client({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null

  const [leadProject, ...secondaryProjects] = projects

  return (
    <div className="relative overflow-hidden px-6 py-24 sm:px-8 md:px-10 md:py-32 xl:px-12 2xl:px-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_70%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-[#eadfce] blur-3xl" />
      <div className="pointer-events-none absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-[#efe5d7] blur-3xl" />

      <motion.div
        className="relative mb-16 md:mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.div
          className="h-px w-full origin-left bg-black/12"
          variants={{
            hidden: { scaleX: 0, opacity: 0.5 },
            visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease } },
          }}
        />

        <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(320px,0.78fr)] xl:items-end">
          <div>
            <motion.p
              className="mb-5 text-[10px] font-medium uppercase tracking-[0.28em] text-black/38"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
            >
              Featured Projects / V2
            </motion.p>
            <motion.h2
              className="text-[#111111]"
              style={{ fontFamily: 'var(--font-heading)' }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: 'blur(10px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease } },
              }}
            >
              <span className="block text-[clamp(50px,8vw,108px)] font-bold uppercase leading-[0.9] tracking-[0.05em]">
                Selected
              </span>
              <span className="block text-[clamp(50px,8vw,108px)] font-bold uppercase leading-[0.9] tracking-[0.05em]">
                Works
              </span>
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-col items-start gap-6 xl:items-end"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            <p className="max-w-[34ch] text-[15px] leading-7 text-black/56">
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
                  <span className={`nav-link-default-text ${navText}`}>All Projects →</span>
                </motion.span>
                <motion.span className="nav-link-layer" variants={ctaHoverLayer} transition={ctaTrans} aria-hidden>
                  <span className={`nav-link-hover-text ${navText}`}>All Projects →</span>
                </motion.span>
              </span>
            </MotionLink>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative">
        <div className="mb-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">
          <span>Lead Feature</span>
          <span className="h-px w-10 bg-black/12" aria-hidden />
        </div>
        <LeadProject project={leadProject} />

        {secondaryProjects.length > 0 ? (
          <div className="mt-14 border-t border-black/10 pt-8 md:mt-16 md:pt-10">
            <div className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-black/38">
                  Supporting Selection
                </p>
                <h3
                  className="mt-3 text-[clamp(28px,4vw,48px)] font-bold uppercase leading-[0.92] tracking-[0.05em] text-[#111111]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  More from the portfolio
                </h3>
              </div>

              <p className="max-w-[28rem] text-[14px] leading-7 text-black/52">
                A more structured set of supporting projects to keep the section balanced after the lead feature.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-12 gap-5 md:gap-6 xl:gap-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {secondaryProjects.map((project, index) => (
                <SecondaryProjectTile key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
