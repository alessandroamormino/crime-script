'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState(text) // Inizia col testo finale
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!isAnimating || currentIndex >= text.length) {
      setDisplayText(text) // Assicura che alla fine mostri il testo corretto
      return
    }

    let iterations = 0
    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (index < currentIndex) {
              return text[index]
            }
            if (index === currentIndex && iterations >= 3) {
              return text[index]
            }
            if (char === ' ') return ' ' // Mantieni gli spazi
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      })

      if (iterations >= 3) {
        clearInterval(interval)
        setCurrentIndex((prev) => prev + 1)
      }
      iterations++
    }, 30) // Più veloce

    return () => clearInterval(interval)
  }, [currentIndex, text, isAnimating])

  return <span className={className}>{displayText}</span>
}

export function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 200)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`${className} ${isGlitching ? 'animate-pulse' : ''}`} style={{
      textShadow: isGlitching ? '2px 2px #dc2626, -2px -2px #3b82f6' : 'none'
    }}>
      {text}
    </span>
  )
}
