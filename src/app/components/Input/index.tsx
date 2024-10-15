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
      <label htmlFor={name} className="block text-xs leading-none mb-2">
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </label>
      <input
        id={name}
        name={name}
        className={cn(
          'w-full font-sans rounded-lg border border-gray-500bg-gray-100 text-gray-900 h-[52px] p-4 text-base focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:bg-gray-200',
          {
            'bg-red-100 dark:bg-red-100': error,
          },
        )}
        type={type}
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
      {error && (
        <div className="text-sm leading-tight mt-1 text-red-500">
          {!error?.message && error?.type === 'required' ? 'To pole jest wymagane' : error?.message}
        </div>
      )}
    </div>
  )
}
