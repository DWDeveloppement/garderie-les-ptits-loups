// Exemples d'usage des variants Card
import { Card, CardContent, CardHeader, CardTitle } from "./card"

export function CardExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {/* Primary Card (Purple-based) */}
      <Card>
        <CardHeader>
          <CardTitle>Primary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card avec variant primary basé sur la palette purple</p>
        </CardContent>
      </Card>

      {/* Secondary Card (Orange-based) */}
      <Card>
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card avec variant secondary basé sur la palette orange</p>
        </CardContent>
      </Card>

      {/* Neutral Card */}
      <Card>
        <CardHeader>
          <CardTitle>Neutral Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card neutre avec background blanc</p>
        </CardContent>
      </Card>

      {/* Neutral Card */}
      <Card>
        <CardHeader>
          <CardTitle>Neutral Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card neutre avec background blanc</p>
        </CardContent>
      </Card>
    </div>
  )
}
