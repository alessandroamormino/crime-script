'use client'

import { useState } from 'react'

interface BuyButtonProps {
  episodeId: number
}

export default function BuyButton({ episodeId }: BuyButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handlePurchase() {
    setLoading(true)

    try {
      const res = await fetch('/api/checkout/episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ episodeId })
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.message || 'Errore durante il checkout')
        setLoading(false)
      }
    } catch (error) {
      alert('Errore durante il checkout')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="bg-gray-700 hover:bg-red-600 text-white px-6 py-2 rounded transition text-sm font-semibold disabled:opacity-50"
    >
      {loading ? 'Caricamento...' : 'Acquista'}
    </button>
  )
}
