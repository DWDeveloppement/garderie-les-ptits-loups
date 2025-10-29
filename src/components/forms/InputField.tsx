'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
    <div className={`grid relative ${className}`}>
      <div className='flex items-baseline justify-between'>
        <Label htmlFor={name} className='text-md font-medium text-purple-10 mb-2 ml-1'>{label}</Label>
      </div>
      <div className='relative group'>
        <Input
          id={name}
          name={name}
          className={`w-full pl-10 pr-3 py-2 ${
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
      {errorMessage && (
        <Callout role='alert' color="red" className="!items-center mt-0.5 absolute top-full left-0 right-0 z-10" size="sm">
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
