import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    // Validazione
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email e password sono obbligatori' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'La password deve essere di almeno 6 caratteri' },
        { status: 400 }
      )
    }

    // Controlla se l'utente esiste già
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email già registrata' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Crea utente
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name || null
      }
    })

    return NextResponse.json(
      { 
        message: 'Registrazione completata',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Errore durante la registrazione' },
      { status: 500 }
    )
  }
}
