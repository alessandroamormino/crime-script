import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = (await headers()).get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { message: 'Webhook Error' },
      { status: 400 }
    )
  }

  // Gestisci eventi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = parseInt(session.metadata!.userId)
    const type = session.metadata!.type

    if (type === 'episode') {
      // Salva acquisto episodio
      const episodeId = parseInt(session.metadata!.episodeId)
      
      await prisma.purchase.create({
        data: {
          userId,
          episodeId,
          pricePaidCents: session.amount_total!,
          stripePaymentIntentId: session.payment_intent as string
        }
      })
    } else if (type === 'bundle') {
      // Salva acquisto bundle
      const caseId = parseInt(session.metadata!.caseId)
      
      await prisma.caseBundle.create({
        data: {
          userId,
          caseId,
          pricePaidCents: session.amount_total!,
          stripePaymentIntentId: session.payment_intent as string
        }
      })
    }
  }

  return NextResponse.json({ received: true })
}
