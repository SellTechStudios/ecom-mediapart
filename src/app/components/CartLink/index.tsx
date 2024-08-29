'use client'

import { useCart } from '@/providers/Cart'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const CartLink: React.FC = () => {
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link href="/cart" className="flex items-center gap-1">
      <ShoppingBagIcon className="size-5" />
      {typeof length === 'number' && length > 0 && <small>({length})</small>}
    </Link>
  )
}
