import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json(
      { message: 'Non autenticato' },
      { status: 401 }
    )
  }

  const { id } = await context.params
  const episodeId = parseInt(id)

  // Verifica che l'utente abbia acquistato l'episodio
  const purchase = await prisma.purchase.findUnique({
    where: {
      userId_episodeId: {
        userId: parseInt(session.user.id),
        episodeId
      }
    },
    include: {
      episode: {
        include: {
          case: true
        }
      }
    }
  })

  // Oppure verifica se ha acquistato il bundle
  if (!purchase) {
    const episode = await prisma.episode.findUnique({
      where: { id: episodeId },
      include: { case: true }
    })

    if (!episode) {
      return NextResponse.json(
        { message: 'Episodio non trovato' },
        { status: 404 }
      )
    }

    const bundle = await prisma.caseBundle.findUnique({
      where: {
        userId_caseId: {
          userId: parseInt(session.user.id),
          caseId: episode.caseId
        }
      },
      include: {
        case: {
          include: {
            episodes: {
              where: { id: episodeId }
            }
          }
        }
      }
    })

    if (!bundle) {
      return NextResponse.json(
        { message: 'Non hai acquistato questo episodio' },
        { status: 403 }
      )
    }

    // Se ha il bundle, scarica l'episodio
    const bundleEpisode = bundle.case.episodes[0]
    
    const filename = `${episode.case.name}_EP${bundleEpisode.episodeNumber}.txt`
    
    return new NextResponse(bundleEpisode.fullScript, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  }

  // Ha acquistato l'episodio singolo
  const episode = purchase.episode
  const filename = `${episode.case.name}_EP${episode.episodeNumber}.txt`

  return new NextResponse(episode.fullScript, {
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
