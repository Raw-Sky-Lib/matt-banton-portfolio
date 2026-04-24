import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjectsSection from '@/components/sections/FeaturedProjectsSection'
import AboutTeaser from '@/components/sections/AboutTeaser'
import CTAStrip from '@/components/sections/CTAStrip'
import Footer from '@/components/layout/Footer'
import { getSiteSettings, getFeaturedProjects, getAboutContent } from '@/lib/queries'

export const revalidate = 3600

export default async function Home() {
  const [settings, projects, about] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
    getAboutContent(),
  ])

  return (
    <>
      <HeroSection settings={settings} />
      <FeaturedProjectsSection projects={projects} />
      <AboutTeaser settings={settings} about={about} />
      <CTAStrip settings={settings} />
      <Footer />
    </>
  )
}
