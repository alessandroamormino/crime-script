'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Registrazione completata! Accedi con le tue credenziali.')
    }
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Email o password non corretti')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('Errore durante il login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid-background flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="text-4xl font-bold">
            Crime<span className="text-primary">Script</span>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Accedi al tuo Account</CardTitle>
            <CardDescription>
              Inserisci le tue credenziali per accedere
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {successMessage && (
                <div className="bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 rounded">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Accesso in corso...' : 'Accedi'}
              </Button>

              <p className="text-center text-muted-foreground text-sm">
                Non hai un account?{' '}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Registrati
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
