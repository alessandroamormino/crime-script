import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-2xl">
        {/* ASCII Art 404 */}
        <pre className="text-primary font-mono text-sm md:text-base overflow-x-auto ascii-glitch">
          {`
  _  _    ___    _  _
 | || |  / _ \\  | || |
 | || |_| | | | | || |_
 |__   _| | | | |__   _|
    | | | |_| |    | |
    |_|  \\___/     |_|
          `}
        </pre>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Pagina Non Trovata</h1>
          <p className="text-muted-foreground text-lg">
            Il mistero di questa pagina rimane irrisolto... non esiste!
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Torna alla Home
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors"
            >
              Esplora il Catalogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
