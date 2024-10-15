'use client'

import { CircleCheckBig, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

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

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
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
            }
          : undefined
      }
    >
      {!isInCart && <ShoppingCart className="mr-3" />}
      {isInCart && <CircleCheckBig className="mr-3" />}
      {isInCart ? `Pokaż w koszyku` : `Dodaj do koszyka`}
    </Button>
  )
}
