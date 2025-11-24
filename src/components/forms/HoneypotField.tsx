'use client'

import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

type HoneypotFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div className='sr-only' aria-hidden='true'>
      <div>
        <Label htmlFor='website'>Site web (ne pas remplir)</Label>
        <Input
          id='website'
          name='website'
          type='text'
          tabIndex={-1}
          autoComplete='off'
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
