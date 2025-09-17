/**Page de test pour les requêtes Sanity
 * Cette page permet de tester les requêtes Sanity et d'afficher les résultats
 */
import { TestSanityQuery } from '@/components/debug/TestSanityQuery'
import { getActivities, getNews, getPrices, getSubsidies, getTeam } from '@/lib/sanity'

export default async function TestSanityPage() {
  // Test des requêtes Sanity
  const [prices, subsidies, news, activities, staff] = await Promise.all([
    getPrices().catch(() => []),
    getSubsidies().catch(() => []),
    getNews().catch(() => []),
    getActivities().catch(() => []),
    getTeam().catch(() => []),
  ])

  const testData = {
    prices,
    subsidies,
    news,
    activities,
    staff,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Test des requêtes Sanity
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📊 Résultats des requêtes</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{prices.length}</div>
                <div className="text-sm text-gray-600">Documents de tarifs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{subsidies.length}</div>
                <div className="text-sm text-gray-600">Documents de subventions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{news.length}</div>
                <div className="text-sm text-gray-600">Actualités</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{activities.length}</div>
                <div className="text-sm text-gray-600">Activités</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{staff.length}</div>
                <div className="text-sm text-gray-600">Membres de l'équipe</div>
              </div>
            </div>
          </div>

          <TestSanityQuery 
            testData={testData} 
            queryName="Test Requêtes Sanity Complètes"
            isEnabled={true}
          />
        </div>
      </div>
    </div>
  )
}
