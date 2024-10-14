'use client'

import Link from 'next/link'
import React, { ElementType } from 'react'

import { cn } from '@/utilities/cn'
import { cva } from 'class-variance-authority'

export type Props = {
  label?: string
  variant?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
}

const buttonVariants = cva(
  'border-none cursor-pointer inline-flex justify-center bg-transparent no-underline p-2.5 px-6 font-inherit leading-inherit text-inherit rounded-md',
  {
    variants: {
      variant: {
        default: 'p-0 text-black bg-transparent border border-black',
        primary: 'text-white bg-black',
        secondary: 'text-black bg-transparent shadow-md',
        none: 'p-0',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  variant,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = cn(buttonVariants({ variant }), classNameFromProps)

  const content = (
    <div className="flex items-center justify-around [&>svg]:mr-3 [&>svg]:w-6 [&>svg]:h-6">
      <span className="text-center flex items-center text-base uppercase leading-6">{label}</span>
      {children}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
