import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-6">
            Crime<span className="text-red-600">Script</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Script professionali per podcast True Crime
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Episodi completi, pronti da leggere. Generati con AI, curati nei dettagli.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/catalogo"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Esplora il Catalogo
            </Link>
            <Link 
              href="/come-funziona"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition"
            >
              Come Funziona
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="text-4xl mb-4">🎙️</div>
            <h3 className="text-xl font-bold mb-3">Script Completi</h3>
            <p className="text-gray-400">
              20+ minuti per episodio, pronti da leggere al microfono. Con indicazioni musicali e pause.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3">Serie Multi-Episodio</h3>
            <p className="text-gray-400">
              Ogni caso diviso in 3 episodi avvincenti con cliffhanger perfetti.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-3">Prezzi Flessibili</h3>
            <p className="text-gray-400">
              Compra singoli episodi o pacchetti completi con sconto.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-12 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pronto a lanciare il tuo podcast True Crime?
          </h2>
          <p className="text-gray-300 mb-8">
            Risparmia ore di ricerca. Inizia a registrare subito.
          </p>
          <Link 
            href="/catalogo"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-block transition"
          >
            Vedi i Casi Disponibili →
          </Link>
        </div>
      </div>
    </div>
  )
}
