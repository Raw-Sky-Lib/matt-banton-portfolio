"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, animate } from "framer-motion"

export default function LoaderScreen() {
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setVisible(false), 280),
    })
    return () => controls.stop()
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="loader-screen fixed inset-0 z-100 flex flex-col justify-between p-6 sm:p-8 md:p-10 xl:p-12 2xl:px-16 2xl:py-14"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="Matt Banton"
            className="h-8 sm:h-9 md:h-11 w-auto object-contain rounded-lg"
          />
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="loader-counter">{count}</span>
              <span className="loader-percent">%</span>
            </div>
            <span className="loader-label">Loading</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
