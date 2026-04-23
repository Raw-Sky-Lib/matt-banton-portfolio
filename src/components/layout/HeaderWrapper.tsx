'use client'

import { useEffect, useState } from 'react'

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-50 w-full transition-all duration-500',
        scrolled ? 'header-scrolled' : 'header-top',
      ].join(' ')}
    >
      {children}
    </header>
  )
}
