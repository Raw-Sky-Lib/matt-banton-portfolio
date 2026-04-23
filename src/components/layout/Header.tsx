import Link from 'next/link'
import HeaderWrapper from './HeaderWrapper'
import NavLink from './NavLink'
import MobileNav from './MobileNav'
import { getSiteSettings, getNavItems } from '@/lib/queries'

export default async function Header() {
  const [settings, navItems] = await Promise.all([
    getSiteSettings(),
    getNavItems(),
  ])

  return (
    <HeaderWrapper>
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-5 md:py-6">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label={settings.site_name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt={settings.site_name}
            className="h-7 sm:h-8 w-auto object-contain rounded-lg"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.id} href={item.url} label={item.label} />
          ))}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden">
          <MobileNav items={navItems} />
        </div>
      </div>
    </HeaderWrapper>
  )
}
