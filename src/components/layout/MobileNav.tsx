"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const NAV_ITEMS = [
  { label: "Work",    href: "/projects" },
  { label: "About",   href: "/about"    },
  { label: "Gallery", href: "/gallery"  },
  { label: "Contact", href: "/contact"  },
]

const ease = [0.32, 0.72, 0, 1] as const

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.38, ease } },
  exit:    { opacity: 0, transition: { duration: 0.26, ease } },
}

const itemVariants = (i: number) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease, delay: 0.1 + i * 0.07 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.18 } },
})

const captionVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.46, duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
}

export default function MobileNav({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const lineClass = light ? "hamburger-line-light" : "hamburger-line"

  return (
    <>
      {/* Hamburger — two asymmetric lines */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center justify-center gap-1.5 w-8 h-8"
        aria-label="Open navigation"
        aria-expanded={open ? "true" : "false"}
      >
        <span className={`block w-4.5 h-px ${lineClass}`} />
        <span className={`block w-3.5 h-px self-start ml-0.5 ${lineClass}`} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            className="mobile-nav-overlay fixed inset-0 z-60 flex flex-col p-6 sm:p-8"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header row: logo + close */}
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.08, duration: 0.3 } }}
                exit={{ opacity: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.webp"
                  alt="Matt Banton"
                  className="h-8 w-auto object-contain rounded-lg"
                />
              </motion.div>

              <motion.button
                type="button"
                onClick={() => setOpen(false)}
                className="relative flex items-center justify-center w-8 h-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1, duration: 0.3 } }}
                exit={{ opacity: 0 }}
                aria-label="Close navigation"
              >
                <span className="close-btn-line absolute block w-4.5 h-px rotate-45" />
                <span className="close-btn-line absolute block w-4.5 h-px -rotate-45" />
              </motion.button>
            </div>

            {/* Nav links — vertically centred */}
            <nav className="flex-1 flex flex-col justify-center gap-0">
              {NAV_ITEMS.map(({ label, href }, i) => (
                <motion.div
                  key={href}
                  variants={itemVariants(i)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="mobile-nav-item mobile-nav-link block py-3 select-none font-bold uppercase"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer caption */}
            <motion.p
              variants={captionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mobile-nav-caption text-[10px] font-medium uppercase tracking-[0.22em]"
            >
              Vienna, Austria · Photography &amp; Film
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
