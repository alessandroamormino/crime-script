import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import BuyButton from './BuyButton'
import BundleButton from './BundleButton'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CasoDetailPage({ params }: PageProps) {
  const { slug } = await params
  const session = await getServerSession(authOptions)

  // Fetch caso con episodi
  const caso = await prisma.case.findUnique({
    where: { slug },
    include: {
      episodes: {
        orderBy: {
          episodeNumber: 'asc'
        }
      }
    }
  })

  if (!caso) {
    notFound()
  }

  // Se l'utente è loggato, controlla cosa ha già acquistato
  let userPurchases: number[] = []
  let hasBundle = false

  if (session) {
    const purchases = await prisma.purchase.findMany({
      where: { userId: parseInt(session.user.id) },
      select: { episodeId: true }
    })
    userPurchases = purchases.map(p => p.episodeId)

    const bundle = await prisma.caseBundle.findUnique({
      where: {
        userId_caseId: {
          userId: parseInt(session.user.id),
          caseId: caso.id
        }
      }
    })
    hasBundle = !!bundle
  }

  // Calcola prezzi
  const pricePerEpisode = 4.99
  const bundlePrice = (caso.totalEpisodes * pricePerEpisode * 0.8).toFixed(2) // 20% sconto
  const totalPrice = (caso.totalEpisodes * pricePerEpisode).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-red-600 hover:text-red-500">Home</Link>
          <span className="text-gray-600 mx-2">/</span>
          <Link href="/catalogo" className="text-red-600 hover:text-red-500">Catalogo</Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-400">{caso.name.replace(/_/g, ' ')}</span>
        </div>

        {/* Header Caso */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{caso.name.replace(/_/g, ' ')}</h1>
          <p className="text-gray-400 text-lg mb-6">
            {caso.description || 'Una serie completa di episodi true crime pronti per il tuo podcast.'}
          </p>

          {/* Stats */}
          <div className="flex gap-6 text-sm">
            <div className="bg-gray-800 px-4 py-2 rounded">
              <span className="text-gray-400">Episodi: </span>
              <span className="font-semibold">{caso.episodes.length}</span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded">
              <span className="text-gray-400">Durata totale: </span>
              <span className="font-semibold">
                ~{caso.episodes.reduce((sum, ep) => sum + (ep.estimatedDurationMinutes || 0), 0)} min
              </span>
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded">
              <span className="text-gray-400">Parole totali: </span>
              <span className="font-semibold">
                {caso.episodes.reduce((sum, ep) => sum + (ep.wordCount || 0), 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        {!hasBundle && (
          <div className="bg-gradient-to-br from-red-900 to-gray-900 border border-red-600 rounded-lg p-8 mb-12 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Acquista la Serie Completa</h2>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-bold">€{bundlePrice}</span>
              <span className="text-gray-400 line-through text-xl">€{totalPrice}</span>
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                RISPARMIA 20%
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Tutti e {caso.totalEpisodes} gli episodi immediatamente disponibili. 
              Download illimitati, accesso a vita.
            </p>
            
            {session ? (
              <BundleButton caseId={caso.id} />
            ) : (
              <Link
                href="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold w-full block text-center transition"
              >
                Accedi per Acquistare →
              </Link>
            )}
            
            <p className="text-gray-500 text-sm mt-4 text-center">
              Oppure acquista episodi singoli qui sotto
            </p>
          </div>
        )}

        {hasBundle && (
          <div className="bg-green-900 bg-opacity-20 border border-green-600 rounded-lg p-6 mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <div className="font-bold text-lg">Serie Completa Acquistata!</div>
                <div className="text-gray-400">Tutti gli episodi sono disponibili nella tua dashboard</div>
              </div>
            </div>
          </div>
        )}

        {/* Lista Episodi */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Episodi</h2>
          <div className="space-y-4">
            {caso.episodes.map((episodio) => {
              const outline = episodio.outline as any
              const isPurchased = userPurchases.includes(episodio.id) || hasBundle
              
              return (
                <div key={episodio.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                          EP {episodio.episodeNumber}
                        </span>
                        <h3 className="text-xl font-bold">{episodio.episodeTitle}</h3>
                        {isPurchased && (
                          <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-semibold">
                            ACQUISTATO
                          </span>
                        )}
                      </div>
                      
                      {/* Hook/Preview */}
                      {outline?.hook && (
                        <p className="text-gray-400 mb-4 italic">"{outline.hook}"</p>
                      )}

                      {/* Stats episodio */}
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>📝 {episodio.wordCount?.toLocaleString()} parole</span>
                        <span>⏱️ ~{episodio.estimatedDurationMinutes} min</span>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      {!isPurchased ? (
                        <>
                          <div className="text-2xl font-bold mb-2">€{pricePerEpisode}</div>
                          {session ? (
                            <BuyButton episodeId={episodio.id} />
                          ) : (
                            <Link
                              href="/login"
                              className="bg-gray-700 hover:bg-red-600 text-white px-6 py-2 rounded transition text-sm font-semibold inline-block"
                            >
                              Accedi
                            </Link>
                          )}
                        </>
                      ) : (
                        <Link
                          href="/dashboard"
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition text-sm font-semibold inline-block"
                        >
                          Vai alla Dashboard
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Atti (collapsible preview) */}
                  {outline && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-red-500 hover:text-red-400 text-sm font-semibold">
                        Mostra struttura episodio ▼
                      </summary>
                      <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-700">
                        <div>
                          <div className="font-semibold text-sm text-gray-400 mb-1">Atto 1</div>
                          <p className="text-gray-500 text-sm">{outline.act1_intro}</p>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-400 mb-1">Atto 2</div>
                          <p className="text-gray-500 text-sm">{outline.act2_investigation}</p>
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-400 mb-1">Atto 3</div>
                          <p className="text-gray-500 text-sm">{outline.act3_resolution}</p>
                        </div>
                        {outline.cliffhanger && !episodio.isFinalEpisode && (
                          <div className="bg-red-900 bg-opacity-20 p-3 rounded">
                            <div className="font-semibold text-sm text-red-400 mb-1">Cliffhanger</div>
                            <p className="text-gray-400 text-sm italic">{outline.cliffhanger}</p>
                          </div>
                        )}
                      </div>
                    </details>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
