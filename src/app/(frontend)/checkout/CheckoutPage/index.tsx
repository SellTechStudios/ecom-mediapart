'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'

import { CheckoutItem } from '../CheckoutItem'

import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { Settings } from 'src/payload-types'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = (props) => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()

  const { cart, cartIsEmpty, cartTotal } = useCart()

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  return (
    <Fragment>
      {cartIsEmpty ? (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      ) : (
        <div className="my-8">
          <div className="hidden sm:grid grid-cols-[100px_5fr_1fr_1fr] gap-6 pb-2 border-b border-gray-300">
            <p>Products</p>
            <p></p>
            <div className="text-right">Quantity</div>
            <div className="text-right">Subtotal</div>
          </div>

          <ul>
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { title },
                } = item

                if (!quantity) return null

                const metaImage = product.mediaImages[0].url

                return (
                  <CheckoutItem
                    key={index}
                    product={product}
                    title={title}
                    metaImage={metaImage}
                    quantity={quantity}
                    index={index}
                  />
                )
              }
              return null
            })}
            <div className="flex justify-between px-6 py-6 font-semibold text-right bg-gray-300 mb-15">
              <p>Order Total</p>
              <p>{cartTotal.formatted}</p>
            </div>
          </ul>
        </div>
      )}
    </Fragment>
  )
}
