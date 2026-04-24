import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import FeaturedProjectsSectionV2 from '@/components/sections/FeaturedProjectsSectionV2'
import { getFeaturedProjects } from '@/lib/queries'

export const revalidate = 3600

export default async function FeaturedProjectsComparePage() {
  const projects = await getFeaturedProjects()

  return (
    <div className="bg-[var(--color-bg)]">
      <section className="border-b border-border px-6 py-16 sm:px-8 md:px-10 md:py-20 xl:px-12 2xl:px-16">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
          Comparison Page
        </p>
        <h1
          className="text-[clamp(42px,7vw,88px)] font-bold uppercase leading-[0.9] tracking-[0.05em] text-[#111111]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Featured Projects
        </h1>
        <p className="mt-5 max-w-[44rem] text-[15px] leading-7 text-[var(--color-text-muted)]">
          Current `v1` stays untouched below. The new `v2` explores a lighter, cleaner direction so you can compare both with the client before we commit.
        </p>
      </section>

      <section>
        <div className="px-6 pt-10 sm:px-8 md:px-10 xl:px-12 2xl:px-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/45">
            Version 1 / Current Dark Direction
          </p>
        </div>
        <FeaturedProjectsSection projects={projects} />
      </section>

      <section>
        <div className="px-6 pt-10 sm:px-8 md:px-10 xl:px-12 2xl:px-16">
          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-black/45">
            Version 2 / Light Direction
          </p>
        </div>
        <FeaturedProjectsSectionV2 projects={projects} />
      </section>
    </div>
  )
}
