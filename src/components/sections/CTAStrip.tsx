import type { SiteSettings } from '@/types/content'
import CTAStripClient from './CTAStripClient'

export default function CTAStrip({ settings }: { settings: SiteSettings }) {
  return (
    <section className="cta-section">
      <CTAStripClient
        availabilityStatus={settings.availability_status}
        contactEmail={settings.contact_email}
      />
    </section>
  )
}
