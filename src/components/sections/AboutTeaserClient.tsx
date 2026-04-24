'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const ease = [0.32, 0.72, 0, 1] as const

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

interface AboutTeaserClientProps {
  headline: string
  bioShort: string
  profileImageUrl: string | null
}

export default function AboutTeaserClient({
  headline,
  bioShort,
  profileImageUrl,
}: AboutTeaserClientProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
    >
      {/* Portrait */}
      <motion.div variants={fadeUp} className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)]">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={headline}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-surface)]" />
        )}
      </motion.div>

      {/* Text */}
      <motion.div variants={fadeUp} className="flex flex-col justify-center">
        <p className="section-eyebrow mb-6">About</p>
        <h2 className="about-teaser-headline mb-6">{headline}</h2>
        <p className="about-teaser-bio mb-10">{bioShort}</p>
        <Link href="/about" className="section-text-link self-start">
          Read more&nbsp;&rarr;
        </Link>
      </motion.div>
    </motion.div>
  )
}
