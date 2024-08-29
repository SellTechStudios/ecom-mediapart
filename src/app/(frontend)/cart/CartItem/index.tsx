'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import classes from './index.module.scss'
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton'

const CartItem = ({ product, title, image, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

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
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!image && <span>No image</span>}
        {image && typeof image !== 'string' && (
          // <Media className={classes.media} imgClassName={classes.image} resource={image} fill />
          <Image
            src={image.url}
            alt={image.alt ? image.alt : 'Product Image'}
            width={100}
            height={100}
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image src="/assets/icons/plus.svg" alt="plus" width={24} height={24} />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
