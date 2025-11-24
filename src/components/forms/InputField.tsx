'use client';

import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

import { Callout, CalloutIcon, CalloutText } from '../ui/callout';
import { AlertCircle, LucideIcon } from 'lucide-react';

type InputFieldProps = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  required?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  hasError: boolean;
  errorMessage?: string;
  className?: string;
};

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
    <div className={`relative grid ${className}`}>
      <div className='flex items-baseline justify-between'>
        <Label htmlFor={name} className='text-fl-sm !text-purple-10 mb-2 ml-1 font-medium'>
          {label}
        </Label>
      </div>
      <div className='group relative'>
        <Input
          id={name}
          name={name}
          className={`text-fl-base !text-purple-11 placeholder:text-fl-sm placeholder:text-purple-9/70 focus:placeholder:text-orange-9 w-full py-5 pr-3 pl-10 ${
            hasError ? 'border-red-500' : 'border-orange-6'
          } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
        />
        <span className='text-orange-9 group-focus-within:text-purple-9 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform transition-colors duration-200'>
          <Icon className='size-5' />
        </span>
      </div>
      {errorMessage && (
        <Callout
          role='alert'
          color='red'
          className='absolute top-full right-0 left-0 z-10 mt-0.5 !items-center'
          size='sm'>
          <CalloutIcon className='size-4'>
            <AlertCircle />
          </CalloutIcon>
          <CalloutText className='mt-0 ml-6'>{errorMessage}</CalloutText>
        </Callout>
      )}
    </div>
  );
}
