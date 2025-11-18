import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Container } from '@/components/ui/Container'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, FileText, DollarSign } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  // Fetch tutti i casi dal database
  const cases = await prisma.case.findMany({
    include: {
      _count: {
        select: { episodes: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="min-h-screen grid-background">
      <Container className="py-12">
        {/* Header */}
        <div className="mb-12 space-y-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla Home
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Catalogo Casi</h1>
            <p className="text-muted-foreground text-lg">
              Esplora i casi true crime disponibili. Ogni caso include {cases[0]?.totalEpisodes || 3} episodi completi.
            </p>
          </div>
        </div>

        {/* Grid Casi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caso) => (
            <Link key={caso.id} href={`/caso/${caso.slug}`}>
              <Card className="card-hover h-full">
                {/* Immagine placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent flex items-center justify-center border-b">
                  <span className="text-6xl">🔪</span>
                </div>

                {/* Info */}
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition">
                    {caso.name.replace(/_/g, ' ')}
                  </CardTitle>
                  <CardDescription>
                    {caso.description || 'Serie completa disponibile'}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {caso._count.episodes} / {caso.totalEpisodes} episodi
                    </span>
                    <span className="flex items-center gap-1 text-primary font-semibold">
                      <DollarSign className="h-4 w-4" />
                      €{((caso.totalEpisodes * 499) / 100).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {cases.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">Nessun caso disponibile al momento.</p>
          </div>
        )}
      </Container>
    </div>
  )
}
