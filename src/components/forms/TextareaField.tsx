'use client'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
    <div className={`mb-8 grid relative ${className}`}>
      <div className='flex items-baseline justify-between'>
        <Label htmlFor={name} className='text-md font-medium text-purple-10 mb-2 ml-1'>{label}</Label>
      </div>
      <div className='relative group'>
        <Textarea
          id={name}
          name={name}
          className={`w-full pl-10 pr-3 py-2 resize-none ${
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
      {errorMessage && (
        <Callout role='alert' color="red" className="!items-center absolute top-full left-0 right-0 z-10" size="sm">
          <CalloutIcon className='size-4'>
            <AlertCircle />
          </CalloutIcon>
          <CalloutText className='ml-6 mt-0'>
            {errorMessage}
          </CalloutText>
        </Callout>
      )}
    </div>
  )
}
