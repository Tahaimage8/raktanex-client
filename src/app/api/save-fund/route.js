import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req) {
  try {
    const { sessionId } = await req.json()
    

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const { userId, userName, userEmail, amount } = session.metadata


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/funds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        userName,
        userEmail,
        amount: parseFloat(amount),
        stripeSessionId: session.id,
        date: new Date(),
      }),
    })

    const data = await res.json()
    return NextResponse.json({ success: true, data })
    
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}