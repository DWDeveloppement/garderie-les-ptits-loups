import { Card, CardContent } from "@/components/ui/card"

export function AboutIntroSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-bg-light">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="bg-white border-orange-6 shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-12 mb-6">
              Une Garderie à Taille Humaine
            </h2>
            <div className="space-y-4 text-orange-11 leading-relaxed">
              <p>
                Notre garderie privée accueille les enfants de 2 mois jusqu&apos;à l&apos;entrée à l&apos;école, 
                offrant un environnement chaleureux et sécurisé pour leur épanouissement.
              </p>
              <p>
                Située à proximité du parc de Sauvabelin, notre structure dispose d&apos;un jardin 
                privatif de 150 m² où les enfants peuvent jouer en plein air et découvrir la nature.
              </p>
              <p>
                Notre équipe pédagogique qualifiée propose des activités variées et adaptées 
                à chaque âge, favorisant le développement harmonieux de chaque enfant.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
