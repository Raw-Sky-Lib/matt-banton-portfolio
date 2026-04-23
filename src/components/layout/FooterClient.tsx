'use client'

import { motion } from 'framer-motion'

const ease = [0.32, 0.72, 0, 1] as const

export default function FooterClient({ children }: { children: React.ReactNode }) {
  return (
    <motion.footer
      className="site-footer relative z-40"
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.72, ease }}
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.footer>
  )
}
