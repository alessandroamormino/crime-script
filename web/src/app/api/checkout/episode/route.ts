import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { message: 'Non autenticato' },
        { status: 401 }
      )
    }

    const { episodeId } = await request.json()

    // Fetch episodio
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

    // Verifica se già acquistato
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_episodeId: {
          userId: parseInt(session.user.id),
          episodeId: episode.id
        }
      }
    })

    if (existingPurchase) {
      return NextResponse.json(
        { message: 'Episodio già acquistato' },
        { status: 400 }
      )
    }

    // Crea Checkout Session Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${episode.case.name.replace(/_/g, ' ')} - EP${episode.episodeNumber}`,
              description: episode.episodeTitle,
            },
            unit_amount: episode.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        episodeId: episode.id.toString(),
        type: 'episode'
      },
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/caso/${episode.case.slug}?payment=cancelled`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { message: 'Errore durante il checkout' },
      { status: 500 }
    )
  }
}
