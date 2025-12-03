# Features - Formulaire de Contact

## 📊 Vue d'ensemble

Formulaire de contact avec validation multi-niveaux, protection anti-spam et envoi via Resend.

**Stack** : React Hook Form · Zod · reCAPTCHA v2 · Honeypot · Resend · localStorage

---

## 🎯 Fonctionnalités

### Validation Client (Zod)

**Schéma** : `src/lib/validation/contactSchema.ts`

```typescript
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().regex(/^[0-9\s\-\+\(\)]{10,}$/, 'Téléphone invalide'),
  message: z.string().min(10, 'Minimum 10 caractères'),
  website: z.string().optional() // Honeypot
})

export type ContactFormData = z.infer<typeof contactSchema>
```

**Validations** :
- Nom : Min 2 caractères
- Email : Format valide
- Téléphone : Format international (10+ caractères)
- Message : Min 10 caractères
- Website : Honeypot (champ caché)

---

### Protection Anti-Spam

#### 1. reCAPTCHA v2

**Hook** : `src/hooks/forms/useRecaptchaV2.ts`

```typescript
import { useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export function useRecaptchaV2() {
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const executeRecaptcha = async (): Promise<string | null> => {
    if (!recaptchaRef.current) return null
    return await recaptchaRef.current.executeAsync()
  }

  const resetRecaptcha = () => {
    recaptchaRef.current?.reset()
  }

  return { recaptchaRef, executeRecaptcha, resetRecaptcha }
}
```

**Configuration** :
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

#### 2. Honeypot

Champ caché pour piéger les bots.

```tsx
<input
  type="text"
  name="website"
  tabIndex={-1}
  autoComplete="off"
  className="absolute opacity-0 pointer-events-none"
  aria-hidden="true"
/>
```

**Validation serveur** :
```typescript
if (formData.website) {
  return Response.json({ error: 'Spam detected' }, { status: 400 })
}
```

---

### Persistence (localStorage)

**Hook** : `src/hooks/forms/useLocalStorage.ts`

```typescript
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const stored = localStorage.getItem(key)
    if (stored) {
      setValue(JSON.parse(stored))
    }
  }, [key])

  const updateValue = (newValue: T) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }

  return [value, updateValue] as const
}
```

**Usage** :
```typescript
const [formData, setFormData] = useLocalStorage<ContactFormData>(
  'contactForm',
  defaultFormData
)
```

**Avantages** :
- Données préservées en cas de refresh
- Améliore UX
- Auto-clear après succès

---

## 🔄 Workflow Complet

### 1. Client → Validation Zod

```typescript
const { handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema)
})
```

### 2. Client → reCAPTCHA v2

```typescript
const token = await executeRecaptcha()
if (!token) {
  setError('reCAPTCHA échoué')
  return
}
```

### 3. Client → Honeypot

```typescript
if (formData.website) {
  // Silently reject (bot detected)
  return
}
```

### 4. Client → POST /api/contact

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    recaptchaToken: token
  })
})
```

### 5. Serveur → Validation reCAPTCHA

```typescript
// app/api/contact/route.ts
const verifyResponse = await fetch(
  `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
)

const { success } = await verifyResponse.json()
if (!success) {
  return Response.json({ error: 'reCAPTCHA invalide' }, { status: 400 })
}
```

### 6. Serveur → Validation Zod

```typescript
const validated = contactSchema.parse(body)
```

### 7. Serveur → Envoi Email (Resend)

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'contact@garderielesptitsloups.ch',
  to: 'admin@garderielesptitsloups.ch',
  subject: `Nouveau message de ${validated.name}`,
  html: `
    <h1>Nouveau message de contact</h1>
    <p><strong>Nom :</strong> ${validated.name}</p>
    <p><strong>Email :</strong> ${validated.email}</p>
    <p><strong>Téléphone :</strong> ${validated.phone}</p>
    <p><strong>Message :</strong></p>
    <p>${validated.message}</p>
  `
})
```

### 8. Client → Success → Clear localStorage

```typescript
if (response.ok) {
  localStorage.removeItem('contactForm')
  setFormData(defaultFormData)
  resetRecaptcha()
}
```

---

## 🧩 Composants

### `ContactFormSection.tsx`

**Chemin** : `src/components/pages/contact/ContactFormSection.tsx`

**Structure** :
```tsx
'use client'

export function ContactFormSection() {
  const { recaptchaRef, executeRecaptcha, resetRecaptcha } = useRecaptchaV2()
  const [formData, setFormData] = useLocalStorage('contactForm', defaultFormData)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    // 1. Honeypot check
    if (data.website) return

    // 2. reCAPTCHA
    const token = await executeRecaptcha()
    if (!token) {
      setError('reCAPTCHA échoué')
      return
    }

    // 3. POST API
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...data, recaptchaToken: token })
    })

    if (response.ok) {
      localStorage.removeItem('contactForm')
      resetRecaptcha()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('name')} error={errors.name?.message} />
      <Input {...register('email')} error={errors.email?.message} />
      <Input {...register('phone')} error={errors.phone?.message} />
      <Textarea {...register('message')} error={errors.message?.message} />

      {/* Honeypot */}
      <input type="text" name="website" className="hidden" />

      <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} size="invisible" />

      <Button type="submit" loading={isSubmitting}>
        Envoyer
      </Button>
    </form>
  )
}
```

---

## 📚 API Route

**Fichier** : `app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/validation/contactSchema'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // 1. Honeypot
    if (body.website) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 })
    }

    // 2. reCAPTCHA
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`
    )
    const { success } = await verifyResponse.json()
    if (!success) {
      return NextResponse.json({ error: 'reCAPTCHA invalide' }, { status: 400 })
    }

    // 3. Zod validation
    const validated = contactSchema.parse(body)

    // 4. Send email
    await resend.emails.send({
      from: 'contact@garderielesptitsloups.ch',
      to: 'admin@garderielesptitsloups.ch',
      subject: `Nouveau message de ${validated.name}`,
      html: `
        <h1>Nouveau message de contact</h1>
        <p><strong>Nom :</strong> ${validated.name}</p>
        <p><strong>Email :</strong> ${validated.email}</p>
        <p><strong>Téléphone :</strong> ${validated.phone}</p>
        <p><strong>Message :</strong></p>
        <p>${validated.message}</p>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    )
  }
}
```

---

## 🎨 Accessibilité

### ARIA Labels

```tsx
<Input
  {...register('email')}
  aria-label="Adresse email"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" className="text-red-600">
    {errors.email.message}
  </span>
)}
```

### Focus Management

```tsx
useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const firstError = Object.keys(errors)[0]
    document.querySelector(`[name="${firstError}"]`)?.focus()
  }
}, [errors])
```

---

## 🔒 Sécurité

### Validation Double

**Client** : Zod (feedback immédiat)
**Serveur** : Zod (sécurité)

### Rate Limiting

**Recommandation** : Ajouter rate limiting sur l'API route.

```typescript
// Utiliser Upstash Redis ou Vercel KV
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h') // 3 requêtes / heure
})
```

---

## 📊 Statistiques

| Couche | Protection | Status |
|--------|-----------|--------|
| **Client** | Zod validation | ✅ |
| **Client** | reCAPTCHA v2 | ✅ |
| **Client** | Honeypot | ✅ |
| **Client** | localStorage | ✅ |
| **Serveur** | Zod validation | ✅ |
| **Serveur** | reCAPTCHA verify | ✅ |
| **Serveur** | Honeypot check | ✅ |
| **Serveur** | Rate limiting | ❌ (TODO) |

---

## 📚 Références

- **React Hook Form** : https://react-hook-form.com/
- **Zod** : https://zod.dev/
- **reCAPTCHA v2** : https://developers.google.com/recaptcha/docs/display
- **Resend** : https://resend.com/docs

---

**Dernière mise à jour** : 2025-12-03
**Version** : 1.0.0
