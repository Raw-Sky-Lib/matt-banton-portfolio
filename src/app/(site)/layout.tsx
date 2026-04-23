import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const revalidate = 3600

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
