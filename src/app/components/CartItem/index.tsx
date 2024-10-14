'use client'

import { RemoveFromCartButton } from '@/components/RemoveFromCartButton'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const CartItem = ({ product, title, image, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  return (
    <li className="grid grid-cols-[100px_3fr_1fr_1fr_1fr] py-6 gap-6 border-b border-gray-300">
      <Link href={`/products/${product.slug}`} className="relative h-full">
        {!image && <span>No image</span>}
        {image && typeof image !== 'string' && (
          <Image
            src={image.url}
            alt={image.alt ? image.alt : 'Product Image'}
            width={100}
            height={100}
            className="object-contain max-w-full aspect-square"
          />
        )}
      </Link>

      <div className="self-center truncate">{title}</div>
      <QuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        addItemToCart={addItemToCart}
        product={product}
      />

      <div className="flex items-center justify-center">
        {new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency: 'PLN',
        }).format(product.price * quantity)}
      </div>
      <div className="flex self-center justify-center">
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

const QuantityButton = ({ quantity, setQuantity, addItemToCart, product }) => {
  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }
  return (
    <div className="border border-gray-500 grid grid-cols-[45px_1fr_45px] rounded-lg items-center h-11 max-w-[120px] self-center ">
      <button className="flex justify-center w-full h-full cursor-pointer" onClick={decrementQty}>
        <Image
          src="/assets/icons/minus.svg"
          alt="minus"
          width={24}
          height={24}
          className="m-auto"
        />
      </button>

      <input
        type="text"
        className="text-center h-full w-full min-w-[30px] border-none outline-none text-lg font-bold self-center"
        value={quantity}
        onChange={enterQty}
      />

      <button className="self-center w-full h-full cursor-pointer" onClick={incrementQty}>
        <Image src="/assets/icons/plus.svg" alt="plus" width={24} height={24} className="m-auto" />
      </button>
    </div>
  )
}

export default CartItem