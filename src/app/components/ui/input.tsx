import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/cn'
import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  type?: 'text' | 'number' | 'password' | 'email'
  validate?: (value: string) => boolean | string
  disabled?: boolean
}

export const Input: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  type = 'text',
  validate,
  disabled,
}) => {
  return (
    <div className="w-full">
      <Label htmlFor={name} className="mb-2 text-xs leading-none">
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </Label>
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 bg-red-100',
        )}
        {...register(name, {
          required,
          validate,
          ...(type === 'email' && {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Proszę wprowadzić poprawny adres e-mail',
            },
          }),
        })}
        disabled={disabled}
      />
      {/* Error message */}
      {error && (
        <div className="text-sm leading-tight mt-1 text-red-500">
          {!error?.message && error?.type === 'required' ? 'To pole jest wymagane' : error?.message}
        </div>
      )}
    </div>
  )
}
