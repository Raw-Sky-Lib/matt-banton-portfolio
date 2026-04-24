import type { SiteSettings } from '@/types/content'
import HeroSectionClient from './HeroSectionClient'

export default function HeroSection({ settings }: { settings: SiteSettings }) {
  return <HeroSectionClient siteName={settings.site_name} />
}
