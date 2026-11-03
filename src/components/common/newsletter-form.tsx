import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Mail } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NewsletterFormProps {
  className?: string
  compact?: boolean
}

export function NewsletterForm({ className, compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDone(false)

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Escribe un correo válido, por ejemplo nombre@dominio.com')
      return
    }

    setError('')
    setDone(true)
    toast.success('¡Bienvenido a la grada!', {
      description: 'Te avisaremos cuando haya nuevas camisetas o guías.',
    })
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={compact ? 'newsletter-footer' : 'newsletter'} className="sr-only">
          Correo electrónico
        </label>
        <div className="relative flex-1">
          <Mail
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id={compact ? 'newsletter-footer' : 'newsletter'}
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError('')
            }}
            placeholder="tu@correo.com"
            autoComplete="email"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'newsletter-error' : undefined}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="brand" className="sm:w-auto">
          {done ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
          {done ? 'Suscrito' : 'Apuntarme'}
        </Button>
      </div>
      {error ? (
        <p id="newsletter-error" className="mt-2 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Sin spam. Solo camisetas, guías y alguna que otra historia.
        </p>
      )}
    </form>
  )
}
