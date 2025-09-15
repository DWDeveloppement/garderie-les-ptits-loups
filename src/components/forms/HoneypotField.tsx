'use client'

import * as Form from '@radix-ui/react-form'

type HoneypotFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div className='sr-only' aria-hidden='true'>
      <Form.Field name='website'>
        <Form.Label htmlFor='website'>Site web (ne pas remplir)</Form.Label>
        <Form.Control asChild>
          <input
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
        </Form.Control>
      </Form.Field>
    </div>
  )
}
