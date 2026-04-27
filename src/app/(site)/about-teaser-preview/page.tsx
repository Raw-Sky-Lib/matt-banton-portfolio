import AboutTeaser from '@/components/sections/AboutTeaser'
import { getSiteSettings, getAboutContent } from '@/lib/queries'

export const revalidate = 3600

export default async function AboutTeaserPreviewPage() {
  const [settings, about] = await Promise.all([
    getSiteSettings(),
    getAboutContent(),
  ])

  return (
    <div className="bg-bg">
      <section className="border-b border-border px-6 py-16 sm:px-8 md:px-10 md:py-20 xl:px-12 2xl:px-16">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
          Preview
        </p>
        <h1
          className="text-[clamp(42px,7vw,88px)] font-bold uppercase leading-[0.9] tracking-[0.05em] text-[#111111]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About Teaser
        </h1>
        <p className="mt-5 max-w-[44rem] text-[15px] leading-7 text-[var(--color-text-muted)]">
          Light-direction about teaser — portrait + editorial headline + bio, matching the V2 warm aesthetic.
        </p>
      </section>

      <AboutTeaser settings={settings} about={about} />
    </div>
  )
}
