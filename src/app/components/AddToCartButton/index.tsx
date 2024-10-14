'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/Button'

import { useCart } from '@/providers/Cart'
import { cn } from '@/utilities/cn'
import { Product } from 'src/payload-types'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
}> = (props) => {
  const { product, quantity = 1 } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>()
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      variant="primary"
      className={cn(
        'transition-opacity duration-100',
        !hasInitializedCart && 'opacity-0 invisible',
      )}
      onClick={
        !isInCart
          ? () => {
              addItemToCart({
                product,
                quantity,
              })

              router.push('/cart')
            }
          : undefined
      }
    />
  )
}
