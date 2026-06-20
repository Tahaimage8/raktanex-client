import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

export async function POST(req) {
  try {
    const body = await req.json()
    const { amount, userId, userName, userEmail } = body
    
    const headersList = await headers()
    const origin = headersList.get('origin')

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Raktanex',
              description: `Donation from ${userName}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/funding?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/funding?status=cancelled`,
      metadata: {
        userId,
        userName,
        userEmail,
        amount: amount.toString(),
      },
    })

    return NextResponse.json({ url: session.url })
    
  } catch (err) {
    console.error('Stripe error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}