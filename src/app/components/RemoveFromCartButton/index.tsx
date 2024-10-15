'use client'
import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/Cart'
import { cn } from '@/utilities/cn'
import { Trash2 } from 'lucide-react'
import React from 'react'
import { Product } from 'src/payload-types'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = (props) => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product)

  if (!productIsInCart) {
    return null
  }

  return (
    <Button
      variant="clear"
      onClick={() => {
        deleteItemFromCart(product)
      }}
      className={cn(className, 'text-red-500')}
    >
      <Trash2 />
    </Button>
  )
}
