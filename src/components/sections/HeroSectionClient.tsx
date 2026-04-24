"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import MobileNav from "@/components/layout/MobileNav"
import LoaderScreen from "@/components/layout/LoaderScreen"

const MotionLink = motion.create(Link)

const ease = [0.32, 0.72, 0, 1] as const

const fadeDown = (delay = 0) => ({
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
})

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

const NAV_LINKS = [
  { label: "Work",    href: "/projects" },
  { label: "About",   href: "/about"    },
  { label: "Gallery", href: "/gallery"  },
]

const ctaTrans        = { duration: 0.28, ease }
const ctaDefaultLayer = { rest: { y: "0%"   }, hover: { y: "-100%" } }
const ctaHoverLayer   = { rest: { y: "100%" }, hover: { y: "0%"    } }
const navText         = "whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em]"

/* Selected Works CTA — same Y-flip as nav links.
   Clip is scoped to the text span only; the icon is a flex sibling outside it
   so overflow:clip on the text can never trim the icon's right edge. */
function SelectedWorksLink() {
  return (
    <MotionLink
      href="/projects"
      className="inline-flex items-center gap-2 select-none"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Text — Y-flip inside its own clip */}
      <span className="nav-link-clip">
        <span className={`nav-link-spacer ${navText}`}>Selected Works</span>
        <motion.span className="nav-link-layer" variants={ctaDefaultLayer} transition={ctaTrans}>
          <span className={`nav-link-default-text-light ${navText}`}>Selected Works</span>
        </motion.span>
        <motion.span className="nav-link-layer" variants={ctaHoverLayer} transition={ctaTrans} aria-hidden>
          <span className={`nav-link-hover-text-light ${navText}`}>Selected Works</span>
        </motion.span>
      </span>

      {/* Icon — own clip, same Y-flip as the text */}
      <span className="nav-link-clip shrink-0" aria-hidden>
        <span className="nav-link-spacer">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </span>
        <motion.span className="nav-link-layer nav-link-default-text-light" variants={ctaDefaultLayer} transition={ctaTrans}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.span>
        <motion.span className="nav-link-layer nav-link-hover-text-light" variants={ctaHoverLayer} transition={ctaTrans}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.span>
      </span>
    </MotionLink>
  )
}

/* Nav link with vertical text-flip — supports dark (default) and light (on-video) variants */
function NavLink({
  href,
  label,
  icon,
  className = "",
  light = false,
}: {
  href: string
  label: string
  icon?: React.ReactNode
  className?: string
  light?: boolean
}) {
  const defaultClass = light ? "nav-link-default-text-light" : "nav-link-default-text"
  const hoverClass   = light ? "nav-link-hover-text-light"   : "nav-link-hover-text"

  return (
    <MotionLink
      href={href}
      className={["nav-link", className].filter(Boolean).join(" ")}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <span className="nav-link-clip">
        <span className={`nav-link-spacer inline-flex items-center gap-2 ${navText}`}>
          <span>{label}</span>
          {icon && <span aria-hidden>{icon}</span>}
        </span>
        <motion.span className="nav-link-layer" variants={ctaDefaultLayer} transition={ctaTrans}>
          <span className={`${defaultClass} inline-flex items-center gap-2 ${navText}`}>
            <span>{label}</span>
            {icon && <span aria-hidden>{icon}</span>}
          </span>
        </motion.span>
        <motion.span className="nav-link-layer" variants={ctaHoverLayer} transition={ctaTrans} aria-hidden>
          <span className={`${hoverClass} inline-flex items-center gap-2 ${navText}`}>
            <span>{label}</span>
            {icon && <span aria-hidden>{icon}</span>}
          </span>
        </motion.span>
      </span>
    </MotionLink>
  )
}

export default function HeroSectionClient({ siteName }: { siteName: string }) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <LoaderScreen />

      {/* ── Full-bleed background video ──
          Sized to always cover the container regardless of viewport aspect ratio.
          Slow zoom-out (1.06 → 1 over 22s) adds cinematic depth without distraction. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 22, ease: "linear" }}
      >
        <iframe
          className="showreel-iframe absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          src="https://www.youtube.com/embed/ENMNJyTJ1QE?controls=0&rel=0&playsinline=1&enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=ENMNJyTJ1QE"
          title="Showreel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>

      {/* ── Gradient overlays (two layers, pointer-events off) ── */}
      {/* Top — keeps nav legible over bright video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
      {/* Bottom — lifts headline off the video */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      {/* ── Content layer ── */}
      <div className="relative z-10 h-full flex flex-col p-6 sm:p-8 md:p-10 xl:p-12 2xl:px-16 2xl:py-14">

        {/* Header — fades down from above */}
        <motion.header {...fadeDown(0)} className="flex justify-between items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt={siteName}
            className="h-8 sm:h-9 md:h-11 lg:h-12 w-auto object-contain rounded-lg"
          />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <NavLink key={href} href={href} label={label} light />
            ))}

            {/* Contact — transparent outline, flips to white tint on hover */}
            <MotionLink
              href="/contact"
              className="nav-cta border border-white/30 px-5 md:px-6 py-2 md:py-2.5 rounded-lg whitespace-nowrap"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <span className={`nav-cta-spacer ${navText}`}>Contact</span>
              <motion.span className="nav-cta-layer nav-cta-light-default" variants={ctaDefaultLayer} transition={ctaTrans}>
                <span className={`nav-cta-light-default-text ${navText}`}>Contact</span>
              </motion.span>
              <motion.span className="nav-cta-layer nav-cta-light-hover" variants={ctaHoverLayer} transition={ctaTrans} aria-hidden>
                <span className={`nav-cta-light-hover-text ${navText}`}>Contact</span>
              </motion.span>
            </MotionLink>
          </nav>

          {/* Mobile — white hamburger over video */}
          <div className="md:hidden">
            <MobileNav light />
          </div>
        </motion.header>

        {/* Main — bottom-left: eyebrow → headline → info strip */}
        <motion.main {...fadeUp(0.3)} className="flex-1 flex flex-col justify-end">

          {/* Eyebrow */}
          <p className="text-white/55 text-[10px] md:text-[11px] font-medium uppercase tracking-[0.3em] mb-5 md:mb-6">
            Photography &amp; Film
          </p>

          {/* Headline — two explicit lines for editorial rhythm */}
          <h1 className="hero-h1 font-bold uppercase">
            <span className="block">Capturing</span>
            <span className="block">what lasts</span>
          </h1>

          {/* Info strip — name left, CTA right */}
          <div className="mt-8 md:mt-10 xl:mt-12 flex items-center justify-between">
            <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.22em]">
              Vienna, Austria
            </p>

            <SelectedWorksLink />
          </div>

        </motion.main>

      </div>
    </div>
  )
}
