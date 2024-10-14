'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'

import { CheckoutItem } from './CheckoutItem'

import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { Settings } from 'src/payload-types'
import { InpostGeowidget } from '@/components/InPostGeoWidget'

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
        <Fragment>
          <div className="my-8">
            <div className="hidden sm:grid grid-cols-[100px_5fr_1fr_1fr] gap-6 pb-2 border-b border-gray-300">
              <p>Products</p>
              <p></p>
              <div className="text-center">Quantity</div>
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
          <div className="my-8" style={{ height: '600px' }}>
            <p>InPost Test</p>
            <InpostGeowidget
              onPoint={(e) => {
                console.log(e)
              }}
              token="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJzQlpXVzFNZzVlQnpDYU1XU3JvTlBjRWFveFpXcW9Ua2FuZVB3X291LWxvIn0.eyJleHAiOjIwNDMyNzQyMzcsImlhdCI6MTcyNzkxNDIzNywianRpIjoiYTcxMzcxODYtNDlhYi00NjYyLTkzNWYtMTdmZGNkZDZiYWFlIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5pbnBvc3QucGwvYXV0aC9yZWFsbXMvZXh0ZXJuYWwiLCJzdWIiOiJmOjEyNDc1MDUxLTFjMDMtNGU1OS1iYTBjLTJiNDU2OTVlZjUzNTo4WkQ0TTZTbEl0MmtvUG9PMUdtYW5QNWEwVmdhZkZfUWdYMkFWWVQxSzVBIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2hpcHgiLCJzZXNzaW9uX3N0YXRlIjoiZDZkZDcxOGEtM2FmZC00NjIwLWI0YTQtODQ0YmNmYTA1MGU2Iiwic2NvcGUiOiJvcGVuaWQgYXBpOmFwaXBvaW50cyIsInNpZCI6ImQ2ZGQ3MThhLTNhZmQtNDYyMC1iNGE0LTg0NGJjZmEwNTBlNiIsImFsbG93ZWRfcmVmZXJyZXJzIjoiIiwidXVpZCI6ImI4NTcyNmMwLTAyMDktNDg4My1hNGVkLTI1NTQ4NmQ3OGJmNSJ9.hD9VLlPWxy_Sl-5-wrxMjBQ_NQe7Si6eoXk9D7imMcpOxrueR9axTcWgWgNACjI-FTfnKWmVuXsJiasTxmzP7qvqbm8e9SOF9_K6qcOvCn1kXd9Hq3YijyT4aeYbDMkct2C2CBOGNL6xZ-NANDYSZ8T_GjnZIMBXmx9z-ZGcA6NroZY8ThqjP-AKGLSAHVcyMcsc7CmXd1MWFJHa2WPgIq8vUKFLc-D3vgYA-4ErkUxhDv2wfUoBQGU0FGlysEVHNn7_5vcg3tcYxLd6X3T20nwWg4LZ7R04HGW1zHga-pRwSHOHh3lF4lw8u-qjXEzccdpmCkG-GWutmP4Oc576tg"
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}