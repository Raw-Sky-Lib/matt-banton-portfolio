import type { SiteSettings, AboutContent } from '@/types/content'
import AboutTeaserClient from './AboutTeaserClient'

interface AboutTeaserProps {
  settings: SiteSettings
  about: AboutContent
}

export default function AboutTeaser({ settings, about }: AboutTeaserProps) {
  return (
    <section className="bg-warm-bg">
      <AboutTeaserClient
        headline={about.headline}
        bioShort={settings.bio_short}
        profileImageUrl={about.profile_image_url}
        location={settings.location}
      />
    </section>
  )
}
