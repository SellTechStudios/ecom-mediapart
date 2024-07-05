'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '../../_providers/Cart'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link href="/cart">
      <ShoppingBagIcon className="size-5" />
      {typeof length === 'number' && length > 0 && <small>({length})</small>}
    </Link>
  )
}
