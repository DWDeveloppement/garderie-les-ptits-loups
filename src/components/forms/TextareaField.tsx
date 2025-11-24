'use client';

import { Label } from '@/ui/label';
import { Textarea } from '@/ui/textarea';

import { Callout, CalloutIcon, CalloutText } from '@/ui/callout';
import { AlertCircle, LucideIcon } from 'lucide-react';

type TextareaFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  required?: boolean;
  disabled?: boolean;
  icon: LucideIcon;
  hasError: boolean;
  errorMessage?: string;
  minHeight?: string;
  className?: string;
};

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
    <div className={`relative mb-8 grid ${className}`}>
      <div className='flex items-baseline justify-between'>
        <Label htmlFor={name} className='text-fl-sm !text-purple-10 mb-2 ml-1 font-medium'>
          {label}
        </Label>
      </div>
      <div className='group relative'>
        <Textarea
          id={name}
          name={name}
          className={`text-fl-base !text-purple-11 placeholder:text-fl-sm placeholder:text-purple-9/70 focus:placeholder:text-orange-9 w-full resize-none py-4 pr-3 pl-10 ${
            hasError ? 'border-red-500' : 'border-orange-6'
          } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          style={{ minHeight }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
        />
        <span className='text-orange-9 group-focus-within:text-purple-9 pointer-events-none absolute top-6 left-3 transition-colors duration-200'>
          <Icon className='size-5' />
        </span>
      </div>
      {errorMessage && (
        <Callout role='alert' color='red' className='absolute top-full right-0 left-0 z-10 !items-center' size='sm'>
          <CalloutIcon className='size-4'>
            <AlertCircle />
          </CalloutIcon>
          <CalloutText className='mt-0 ml-6'>{errorMessage}</CalloutText>
        </Callout>
      )}
    </div>
  );
}
