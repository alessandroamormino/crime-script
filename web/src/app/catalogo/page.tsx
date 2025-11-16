import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  // Fetch tutti i casi dal database
  const cases = await prisma.case.findMany({
    include: {
      _count: {
        select: { episodes: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-red-600 hover:text-red-500 mb-4 inline-block">
            ← Torna alla Home
          </Link>
          <h1 className="text-5xl font-bold mb-4">Catalogo Casi</h1>
          <p className="text-gray-400 text-lg">
            Esplora i casi true crime disponibili. Ogni caso include {cases[0]?.totalEpisodes || 3} episodi completi.
          </p>
        </div>

        {/* Grid Casi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caso) => (
            <Link 
              key={caso.id}
              href={`/caso/${caso.slug}`}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition group"
            >
              {/* Immagine placeholder */}
              <div className="h-48 bg-gradient-to-br from-red-900 to-gray-900 flex items-center justify-center">
                <span className="text-6xl">🔪</span>
              </div>
              
              {/* Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition">
                  {caso.name.replace(/_/g, ' ')}
                </h2>
                <p className="text-gray-400 mb-4">
                  {caso.description || 'Serie completa disponibile'}
                </p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {caso._count.episodes} / {caso.totalEpisodes} episodi
                  </span>
                  <span className="text-red-500 font-semibold">
                    €{((caso.totalEpisodes * 499) / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {cases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Nessun caso disponibile al momento.</p>
          </div>
        )}
      </div>
    </div>
  )
}
