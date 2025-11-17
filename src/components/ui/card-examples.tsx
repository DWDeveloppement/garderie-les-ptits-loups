// Exemples d'usage des variants Card
import { Card, CardContent, CardHeader, CardTitle } from "./card"

export function CardExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Card Shadcn par défaut (sans variants) */}
      <Card>
        <CardHeader>
          <CardTitle>Card Shadcn par défaut</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Comportement original Shadcn (bg-card, text-card-foreground, py-6)</p>
        </CardContent>
      </Card>

      {/* Primary Card (Purple-based) */}
      <Card variant="primary" size="md">
        <CardHeader>
          <CardTitle>Primary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card avec variant primary basé sur la palette purple</p>
        </CardContent>
      </Card>

      {/* Secondary Card (Orange-based) */}
      <Card variant="secondary" size="lg">
        <CardHeader>
          <CardTitle>Secondary Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card avec variant secondary basé sur la palette orange, size lg</p>
        </CardContent>
      </Card>

      {/* Neutral Card interactive */}
      <Card variant="neutral" size="sm" interactive>
        <CardHeader>
          <CardTitle>Neutral Card Interactive</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card neutre avec background blanc, size sm, interactive (hover effect)</p>
        </CardContent>
      </Card>

      {/* Primary interactive */}
      <Card variant="primary" size="md" interactive>
        <CardHeader>
          <CardTitle>Primary Interactive</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card primary avec effet hover (-translate-y-1)</p>
        </CardContent>
      </Card>

      {/* Secondary avec size custom */}
      <Card variant="secondary" size="xl">
        <CardHeader>
          <CardTitle>Secondary XL</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card secondary avec size xl (p-10)</p>
        </CardContent>
      </Card>
    </div>
  )
}
