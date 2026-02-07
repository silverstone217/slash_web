import Header from "@/components/home/Header";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 px-4">
        {/* Hero section */}
        <Hero />

        <div className="my-10" />

        {/* How it works section */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1. Créez un compte</h3>
              <p className="text-gray-600">
                Inscrivez-vous pour accéder à toutes les fonctionnalités de
                notre plateforme.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                2. Ajoutez vos produits
              </h3>
              <p className="text-gray-600">
                Partagez vos produits préférés avec la communauté en quelques
                clics simples.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                3. Partagez et recevez des retours
              </h3>
              <p className="text-gray-600">
                Connectez-vous avec des clients et obtenez des retours sur vos
                produits directement sur Whatsapp.
              </p>
            </div>
          </div>
        </div>

        {/* Product section */}
        {/* Newsletter section */}
        {/* Footer */}
      </main>
    </div>
  );
}
