'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/providers/Auth'

type FormData = {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current as string)
        else router.push('/')
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full gap-6 mt-8 mb-4"
    >
      <Message error={error} className="mb-4" />
      <Input
        name="email"
        label="Email"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="password"
        type="password"
        label="Hasło"
        required
        register={register}
        error={errors.password}
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Processing' : 'Login'}
      </Button>
      <div className="flex items-center justify-between w-full">
        <Link href="/create-account">Utwórz konto</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>Przywróć hasło</Link>
      </div>
    </form>
  )
}

export default LoginForm
