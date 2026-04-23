import FooterClient from './FooterClient'
import { getSiteSettings } from '@/lib/queries'

export default async function Footer() {
  const settings = await getSiteSettings()
  const year     = new Date().getFullYear()

  return (
    <FooterClient>
      <div className="footer-inner px-6 sm:px-8 md:px-10 xl:px-12 2xl:px-16 pt-14 pb-10 md:pt-16 md:pb-12">

        {/* Top row — name + social links */}
        <div className="flex items-start justify-between gap-8 mb-14 md:mb-16">
          <div>
            <p className="footer-name">{settings.site_name}</p>
            <p className="footer-tagline">{settings.tagline}</p>
          </div>

          <nav className="flex items-center gap-6 pt-1" aria-label="Social links">
            {settings.social_instagram && (
              <a
                href={settings.social_instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                Instagram
              </a>
            )}
            {settings.social_linkedin && (
              <a
                href={settings.social_linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                LinkedIn
              </a>
            )}
          </nav>
        </div>

        {/* Bottom row — location + copyright */}
        <div className="flex items-center justify-between">
          <p className="footer-meta">
            {settings.location ?? ''}
          </p>
          <p className="footer-meta">
            &copy;&nbsp;{year}&nbsp;{settings.site_name}
          </p>
        </div>

      </div>
    </FooterClient>
  )
}
