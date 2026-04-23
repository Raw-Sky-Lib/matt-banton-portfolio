'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MotionLink = motion.create(Link)

const ease = [0.32, 0.72, 0, 1] as const
const trans = { duration: 0.28, ease }
const defaultLayer = { rest: { y: '0%' }, hover: { y: '-100%' } }
const hoverLayer   = { rest: { y: '100%' }, hover: { y: '0%' } }
const labelClass   = 'text-[11px] font-medium uppercase tracking-[0.15em] whitespace-nowrap'

export default function NavLink({ href, label }: { href: string; label: string }) {
  const pathname  = usePathname()
  const isActive  = pathname === href || (href !== '/' && pathname.startsWith(href))
  const defText   = isActive ? 'nav-link-hover-text' : 'nav-link-default-text'

  return (
    <MotionLink
      href={href}
      className="relative inline-block select-none"
      initial="rest"
      whileHover="hover"
      animate="rest"
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="nav-link-clip">
        {/* invisible spacer — holds layout width */}
        <span className={`nav-link-spacer inline-block ${labelClass}`}>{label}</span>

        {/* resting layer */}
        <motion.span className="nav-link-layer" variants={defaultLayer} transition={trans}>
          <span className={`${defText} ${labelClass}`}>{label}</span>
        </motion.span>

        {/* hover layer */}
        <motion.span className="nav-link-layer" variants={hoverLayer} transition={trans} aria-hidden>
          <span className={`nav-link-hover-text ${labelClass}`}>{label}</span>
        </motion.span>
      </span>

      {/* active underline — 1 px, animated in */}
      <motion.span
        className="absolute bottom-[-3px] left-0 right-0 h-px nav-link-hover-text"
        style={{ backgroundColor: 'currentColor', opacity: 0.25 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 0.25 : 0 }}
        transition={{ duration: 0.35, ease }}
      />
    </MotionLink>
  )
}
