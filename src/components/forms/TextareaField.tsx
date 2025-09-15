'use client'

import * as Form from '@radix-ui/react-form'
import { AlertCircle, LucideIcon } from 'lucide-react'
import { Callout, CalloutIcon, CalloutText } from '../ui/callout'

type TextareaFieldProps = {
  name: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  required?: boolean
  disabled?: boolean
  icon: LucideIcon
  hasError: boolean
  errorMessage?: string
  minHeight?: string
  className?: string
}

export function TextareaField({
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  icon: Icon,
  hasError,
  errorMessage,
  minHeight = '120px',
  className
}: TextareaFieldProps) {
  return (
    <Form.Field className={`mb-8 grid relative ${className}`} name={name}>
      <div className='flex items-baseline justify-between'>
        <Form.Label className='text-md font-medium text-purple-10'>{label}</Form.Label>
      </div>
      <Form.Control asChild>
        <div className='relative group'>
          <textarea
            className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent resize-none ${
              hasError ? 'border-red-500' : 'border-orange-6'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ minHeight }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
          />
          <span className='absolute left-3 top-3 text-orange-9 group-focus-within:text-purple-9 pointer-events-none transition-colors duration-200'>
            <Icon className='size-4' />
          </span>
        </div>
      </Form.Control>
      {errorMessage && (
              <Callout role='alert' color="red" variant="surface" className="!items-center absolute top-full left-0 right-0 z-10 !py-1">
                  <CalloutIcon className='size-4'>
            <AlertCircle />
          </CalloutIcon>
          <CalloutText className='!text-xs'>
            {errorMessage}
          </CalloutText>
        </Callout>
      )}
    </Form.Field>
  )
}
