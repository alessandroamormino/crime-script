import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const purchases = await prisma.purchase.findMany({
    where: {
      userId: parseInt(session.user.id)
    },
    include: {
      episode: {
        include: {
          case: true
        }
      }
    },
    orderBy: {
      purchasedAt: 'desc'
    }
  })

  const bundles = await prisma.caseBundle.findMany({
    where: {
      userId: parseInt(session.user.id)
    },
    include: {
      case: {
        include: {
          episodes: {
            orderBy: {
              episodeNumber: 'asc'
            }
          }
        }
      }
    },
    orderBy: {
      purchasedAt: 'desc'
    }
  })

  const totalScripts = purchases.length + bundles.reduce((sum, b) => sum + b.case.episodes.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-400">Benvenuto, {session.user.name || session.user.email}!</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/catalogo"
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded transition"
            >
              Catalogo
            </Link>
            <Link 
              href="/api/auth/signout"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition"
            >
              Logout
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">{purchases.length}</div>
            <div className="text-gray-400">Episodi Acquistati</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">{bundles.length}</div>
            <div className="text-gray-400">Serie Complete</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-3xl font-bold text-red-500 mb-2">{totalScripts}</div>
            <div className="text-gray-400">Totale Script</div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">I Tuoi Script</h2>

          {bundles.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-300">Serie Complete</h3>
              <div className="space-y-4">
                {bundles.map((bundle) => (
                  <div key={bundle.id} className="bg-gray-800 p-6 rounded-lg">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold mb-2">
                        {bundle.case.name.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-gray-400 mb-3">
                        Serie completa - {bundle.case.episodes.length} episodi
                      </p>
                      <div className="text-sm text-gray-500">
                        Acquistato il {new Date(bundle.purchasedAt).toLocaleDateString('it-IT')}
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {bundle.case.episodes.map((ep) => (
                        <div key={ep.id} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                          <div>
                            <span className="text-sm font-semibold">EP {ep.episodeNumber}:</span>
                            <span className="text-sm ml-2">{ep.episodeTitle}</span>
                          </div>
                          <a
                            href={`/api/download/episode/${ep.id}`}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded text-sm transition"
                          >
                            Download
                          </a>
                        </div>
                      ))}
                    </div>

                    <Link href={`/caso/${bundle.case.slug}`} className="text-red-500 hover:text-red-400 text-sm">
                      Vai alla Serie →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {purchases.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-300">Episodi Singoli</h3>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="bg-gray-800 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                            EP {purchase.episode.episodeNumber}
                          </span>
                          <h4 className="text-lg font-bold">{purchase.episode.episodeTitle}</h4>
                        </div>
                        <p className="text-gray-400 mb-2">
                          {purchase.episode.case.name.replace(/_/g, ' ')}
                        </p>
                        <div className="text-sm text-gray-500">
                          Acquistato il {new Date(purchase.purchasedAt).toLocaleDateString('it-IT')}
                        </div>
                      </div>
                      <a
                        href={`/api/download/episode/${purchase.episode.id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
                      >
                        Download Script
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {purchases.length === 0 && bundles.length === 0 && (
            <div className="bg-gray-800 p-12 rounded-lg text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold mb-3">Nessun acquisto ancora</h3>
              <p className="text-gray-400 mb-6">
                Esplora il catalogo e inizia a creare il tuo podcast!
              </p>
              <Link
                href="/catalogo"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg inline-block transition"
              >
                Vai al Catalogo
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
