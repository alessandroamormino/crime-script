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

    const { caseId } = await request.json()

    // Fetch caso con episodi
    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: { episodes: true }
    })

    if (!caseData) {
      return NextResponse.json(
        { message: 'Caso non trovato' },
        { status: 404 }
      )
    }

    // Verifica se già acquistato
    const existingBundle = await prisma.caseBundle.findUnique({
      where: {
        userId_caseId: {
          userId: parseInt(session.user.id),
          caseId: caseData.id
        }
      }
    })

    if (existingBundle) {
      return NextResponse.json(
        { message: 'Serie già acquistata' },
        { status: 400 }
      )
    }

    // Calcola prezzo (20% sconto)
    const totalPrice = caseData.episodes.reduce((sum, ep) => sum + ep.priceCents, 0)
    const bundlePrice = Math.round(totalPrice * 0.8) // 20% sconto

    // Crea Checkout Session Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `${caseData.name.replace(/_/g, ' ')} - Serie Completa`,
              description: `Tutti i ${caseData.totalEpisodes} episodi`,
            },
            unit_amount: bundlePrice,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        caseId: caseData.id.toString(),
        type: 'bundle'
      },
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/caso/${caseData.slug}?payment=cancelled`,
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
