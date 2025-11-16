'use client'

import { useState } from 'react'

interface BundleButtonProps {
  caseId: number
}

export default function BundleButton({ caseId }: BundleButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handlePurchase() {
    setLoading(true)

    try {
      const res = await fetch('/api/checkout/bundle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId })
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
      className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold w-full transition disabled:opacity-50"
    >
      {loading ? 'Caricamento...' : 'Acquista Serie Completa →'}
    </button>
  )
}
