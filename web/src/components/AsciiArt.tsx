'use client'

import { useEffect, useState } from 'react'

interface AsciiArtProps {
  text: string
  className?: string
}

export function AsciiArt({ text, className = '' }: AsciiArtProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 50)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <pre className={`font-mono text-sm md:text-base overflow-x-auto ${className}`}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">_</span>}
    </pre>
  )
}

export function CrimeScriptLogo({ className = '' }: { className?: string }) {
  const logoOld = `
██████╗ ██████╗ ██╗███╗   ███╗███████╗
██╔════╝██╔══██╗██║████╗ ████║██╔════╝
██║     ██████╔╝██║██╔████╔██║█████╗
██║     ██╔══██╗██║██║╚██╔╝██║██╔══╝
╚██████╗██║  ██║██║██║ ╚═╝ ██║███████╗
╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝
███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
███████╗██║     ██████╔╝██║██████╔╝   ██║
╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
███████║╚██████╗██║  ██║██║██║        ██║
╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
`
const logo = `
            ██████╗██████╗ ██╗███╗   ███╗███████╗        
           ██╔════╝██╔══██╗██║████╗ ████║██╔════╝        
           ██║     ██████╔╝██║██╔████╔██║█████╗          
           ██║     ██╔══██╗██║██║╚██╔╝██║██╔══╝          
           ╚██████╗██║  ██║██║██║ ╚═╝ ██║███████╗        
            ╚═════╝╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝        
                                                         
        ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗     
        ██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝     
        ███████╗██║     ██████╔╝██║██████╔╝   ██║        
        ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║        
███████╗███████║╚██████╗██║  ██║██║██║        ██║███████╗
╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝╚══════╝
	`

  return (
    <pre className={`font-mono text-xs md:text-sm text-primary leading-tight ${className}`}>
      {logo}
    </pre>
  )
}

export function TypewriterText({ text, className = '' }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 80)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}
