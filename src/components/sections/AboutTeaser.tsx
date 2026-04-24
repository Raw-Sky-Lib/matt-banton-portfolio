import type { SiteSettings } from '@/types/content'
import type { AboutContent } from '@/types/content'
import AboutTeaserClient from './AboutTeaserClient'

interface AboutTeaserProps {
  settings: SiteSettings
  about: AboutContent
}

export default function AboutTeaser({ settings, about }: AboutTeaserProps) {
  return (
    <section className="px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 py-24 md:py-32 border-t border-[var(--color-border)]">
      <AboutTeaserClient
        headline={about.headline}
        bioShort={settings.bio_short}
        profileImageUrl={about.profile_image_url}
      />
    </section>
  )
}
