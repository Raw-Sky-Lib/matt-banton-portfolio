'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.32, 0.72, 0, 1] as const

interface AboutTeaserClientProps {
  headline: string
  bioShort: string
  profileImageUrl: string | null
  location: string | null
}

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
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

export default function AboutTeaserClient({
  headline,
  bioShort,
  profileImageUrl,
  location,
}: AboutTeaserClientProps) {
  return (
    <div className="px-6 py-24 sm:px-8 md:px-10 md:py-32 xl:px-12 2xl:px-16">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16 xl:gap-20">

        {/* Portrait */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative overflow-hidden rounded-[28px] bg-[#ddd4c8] aspect-4/5">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={headline}
                fill
                sizes="(max-width: 768px) 100vw, 46vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.035]"
              />
            ) : (
              <div className="absolute inset-0 bg-[#ddd4c8]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/18 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-4 rounded-[20px] border border-white/35" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            className="mb-6 text-[10px] font-medium uppercase tracking-[0.28em] text-black/38"
            variants={{
              hidden:  { opacity: 0, y: 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
          >
            About
          </motion.p>

          <motion.h2
            className="about-teaser-headline"
            variants={{
              hidden:  { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
            }}
          >
            {headline}
          </motion.h2>

          <motion.p
            className="about-teaser-bio mt-7"
            variants={{
              hidden:  { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
            }}
          >
            {bioShort}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-black/10 pt-5"
            variants={{
              hidden:  { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5, ease } },
            }}
          >
            {location ? (
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-black/42">
                {location}
              </p>
            ) : (
              <span />
            )}

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-black/38 transition-colors duration-300 hover:text-black/74"
            >
              <span>About Matt</span>
              <span className="inline-flex -translate-x-0.5 transition-transform duration-300 group-hover:translate-x-0" aria-hidden>
                <ArrowUpRight />
              </span>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}
