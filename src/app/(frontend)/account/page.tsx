'use client'

import { useRouter } from 'next/navigation'
import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Container } from '@/components/Container'
import { Input } from '@/components/Input'
import { Message } from '@/components/Message'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'

type FormData = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const AccountPage: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser, logout } = useAuth()
  const [changePassword, setChangePassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: json.doc.email,
            name: json.doc.name,
            password: '',
            passwordConfirm: '',
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user, router, reset, changePassword])

  return (
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 flex flex-col gap-3 items-start w-full"
      >
        <Message error={error} success={success} className="mb-4" />
        {!changePassword ? (
          <Fragment>
            <Input
              name="email"
              label="Email Address"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Input name="name" label="Name" register={register} error={errors.name} />

            <p>
              {'Change your account details below, or '}
              <button
                type="button"
                className="cursor-pointer underline"
                onClick={() => setChangePassword(!changePassword)}
              >
                click here
              </button>
              {' to change your password.'}
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              {'Change your password below, or '}
              <button
                type="button"
                className="cursor-pointer underline"
                onClick={() => setChangePassword(!changePassword)}
              >
                cancel
              </button>
              .
            </p>
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
              validate={(value) => value === password.current || 'The passwords do not match'}
              error={errors.passwordConfirm}
            />
          </Fragment>
        )}
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading} className="mt-3">
            {isLoading ? 'Processing' : changePassword ? 'Change Password' : 'Update Account'}
          </Button>
          <Button
            className="mt-3"
            variant="secondary"
            onClick={() => {
              logout()
              router.push('/login')
            }}
          >
            Logout
          </Button>
        </div>
      </form>
    </Container>
  )
}

export default AccountPage
