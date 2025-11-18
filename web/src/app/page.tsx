import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CrimeScriptLogo } from '@/components/AsciiArt'
import { AnimatedText } from '@/components/AnimatedText'
import { FileText, Layers, DollarSign, Sparkles, Clock, Download } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen grid-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 relative">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* ASCII Art Logo - Mantenuto come richiesto */}
            <div className="flex justify-center animate-fade-in">
              <CrimeScriptLogo className="hidden md:block" />
              <div className="md:hidden">
                <h1 className="text-5xl font-bold">
                  Crime<span className="text-primary">Script</span>
                </h1>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <div>
                  <AnimatedText text="Script Professionali" delay={300} />
                </div>
                <div>
                  <AnimatedText text="per Podcast " delay={500} />
                  <span className="text-primary">
                    <AnimatedText text="True Crime" delay={700} />
                  </span>
                </div>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Episodi completi generati con AI, pronti da leggere al microfono.
                Risparmia ore di ricerca e inizia a registrare subito.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/catalogo">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Esplora il Catalogo
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white">
                  Scopri di Più
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Tutto quello che ti serve per il tuo podcast
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Script professionali basati su casi reali, divisi in episodi coinvolgenti
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Script Completi</CardTitle>
                  <CardDescription>
                    20+ minuti per episodio, pronti da leggere. Include indicazioni musicali e pause drammatiche.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <Layers className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Serie Multi-Episodio</CardTitle>
                  <CardDescription>
                    Ogni caso diviso in 3 episodi avvincenti con cliffhanger perfetti per mantenere l'attenzione.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <DollarSign className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Prezzi Flessibili</CardTitle>
                  <CardDescription>
                    Compra singoli episodi a €4.99 o la serie completa a €11.98 (20% di sconto).
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Come Funziona</h2>
              <p className="text-muted-foreground text-lg">
                Semplice, veloce e professionale
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                  1
                </div>
                <h3 className="font-semibold text-lg">Scegli un Caso</h3>
                <p className="text-muted-foreground text-sm">
                  Naviga il catalogo e seleziona il true crime che ti interessa
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                  2
                </div>
                <h3 className="font-semibold text-lg">Acquista</h3>
                <p className="text-muted-foreground text-sm">
                  Pagamento sicuro con Stripe. Episodio singolo o serie completa
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                  3
                </div>
                <h3 className="font-semibold text-lg">Scarica e Registra</h3>
                <p className="text-muted-foreground text-sm">
                  Ricevi lo script in formato testo. Pronto da leggere al microfono
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <Clock className="h-10 w-10 text-primary mx-auto" />
                <div className="text-4xl font-bold">~3000</div>
                <div className="text-muted-foreground">Parole per episodio</div>
              </div>
              <div className="space-y-2">
                <Download className="h-10 w-10 text-primary mx-auto" />
                <div className="text-4xl font-bold">20min</div>
                <div className="text-muted-foreground">Durata media</div>
              </div>
              <div className="space-y-2">
                <Sparkles className="h-10 w-10 text-primary mx-auto" />
                <div className="text-4xl font-bold">100%</div>
                <div className="text-muted-foreground">Generato con AI</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <Card className="border-primary max-w-4xl mx-auto">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Pronto a lanciare il tuo podcast True Crime?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Risparmia ore di ricerca e scrittura. I nostri script sono basati su casi reali,
                accuratamente strutturati e pronti per la registrazione.
              </p>
              <Link href="/catalogo">
                <Button size="lg">
                  Vedi i Casi Disponibili →
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
