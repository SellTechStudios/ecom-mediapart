//CreateAccountForm
'use client'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const { create } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      await create(data)
      setSuccess('Account created successfully.')
    } catch (error) {
      setError('There was an error creating the account. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full gap-6 mt-8 mb-4"
    >
      <Input
        name="email"
        label="Email Address"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        error={errors.passwordConfirm}
      />
      <Message error={error} success={success} className="mb-4" />
      <Button
        type="submit"
        label={isLoading ? 'Processing' : 'Create Account'}
        disabled={isLoading}
      />
    </form>
  )
}
