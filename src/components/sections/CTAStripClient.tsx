'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const ease = [0.32, 0.72, 0, 1] as const

interface CTAStripClientProps {
  availabilityStatus: string | null
  contactEmail: string
}

export default function CTAStripClient({
  availabilityStatus,
  contactEmail,
}: CTAStripClientProps) {
  return (
    <motion.div
      className="cta-inner px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24 md:py-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {availabilityStatus && (
        <p className="cta-eyebrow">{availabilityStatus}</p>
      )}

      <h2 className="cta-headline">
        Let&rsquo;s work<br />together.
      </h2>

      <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Link href="/contact" className="cta-link-primary">
          Get in touch&nbsp;&rarr;
        </Link>
        <a
          href={`mailto:${contactEmail}`}
          className="cta-link-secondary"
        >
          {contactEmail}
        </a>
      </div>
    </motion.div>
  )
}
