'use client'

import * as Form from '@radix-ui/react-form'
import { AlertCircle, LucideIcon } from 'lucide-react'
import { Callout, CalloutIcon, CalloutText } from '../ui/callout'

type InputFieldProps = {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel'
  placeholder: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  required?: boolean
  disabled?: boolean
  icon: LucideIcon
  hasError: boolean
  errorMessage?: string
  className?: string
}

export function InputField({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  icon: Icon,
  hasError,
  errorMessage,
  className
}: InputFieldProps) {
  return (
    <Form.Field className={`grid relative ${className}`} name={name}>
      <div className='flex items-baseline justify-between'>
        <Form.Label className='text-md font-medium text-purple-10'>{label}</Form.Label>
      </div>
      <Form.Control asChild>
        <div className='relative group'>
          <input
            className={`w-full pl-10 pr-3 py-2 border rounded-md bg-white text-orange-12 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent ${
              hasError ? 'border-red-500' : 'border-orange-6'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
          />
          <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-9 group-focus-within:text-purple-9 pointer-events-none transition-colors duration-200'>
            <Icon className='size-4' />
          </span>
        </div>
      </Form.Control>
      {errorMessage && (
              <Callout role='alert' color="red" variant="surface" size="1" className="!items-center mt-0.5 absolute top-full left-0 right-0 z-10 !py-1">
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
