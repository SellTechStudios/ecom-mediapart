'use client'

import CartItem from '@/components/CartItem'
import Link from 'next/link'
import React, { Fragment } from 'react'

import { LoadingShimmer } from '@/components/LoadingShimmer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { Settings } from 'src/payload-types'

export const CartPage: React.FC<{
  settings: Settings
}> = (props) => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className="my-8">
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          <br />
          {!hasInitializedCart ? (
            <div className="my-8">
              <LoadingShimmer />
            </div>
          ) : (
            <Fragment>
              {cartIsEmpty ? (
                <div className="my-8 text-center">
                  Twój koszyk jest pusty.
                  {typeof productsPage === 'object' && productsPage?.slug && (
                    <Fragment>
                      {' '}
                      <Link href={`/${productsPage.slug}`} className="text-blue-600 underline">
                        Kliknij tutaj
                      </Link>
                      {` żeby zacząć zakupy.`}
                    </Fragment>
                  )}
                  {!user && (
                    <Fragment>
                      {' '}
                      <Link href={`/login?redirect=%2Fcart`} className="text-blue-600 underline">
                        Zaloguj
                      </Link>
                      {` się, aby zobaczyć swoje zamówienia.`}
                    </Fragment>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-16 my-8">
                  <div>
                    {/* CART LIST HEADER */}
                    <div className="hidden sm:grid sm:grid-cols-[100px_3fr_1fr_1fr_1fr] gap-6 mb-2">
                      <p>Produkt</p>
                      <p></p>
                      <p className="text-center">Ilość</p>
                      <p className="text-center">Łącznie</p>
                      <p className="text-center">Usuń</p>
                    </div>
                    {/* CART ITEM LIST */}
                    <ul className="border-t border-gray-300">
                      {cart?.items?.map((item, index) => {
                        if (typeof item.product === 'object') {
                          const {
                            quantity,
                            product,
                            product: { id, title, mediaImages },
                          } = item

                          return (
                            <CartItem
                              key={id}
                              product={product}
                              title={title}
                              image={mediaImages[0]}
                              qty={quantity}
                              addItemToCart={addItemToCart}
                            />
                          )
                        }
                        return null
                      })}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4 p-6 border border-gray-300">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                      <h6 className="text-lg font-semibold">Podsumowanie</h6>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                      <p className="text-lg">Delivery Charge</p>
                      <p className="text-lg">0 zł</p>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-gray-300">
                      <p className="text-lg">Łączna ilość</p>
                      <p className="text-lg font-semibold">{cartTotal.formatted}</p>
                    </div>

                    <Button
                      href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                      className="w-full"
                    >
                      {user ? 'Przejdź do płatności' : 'Zaloguj się, aby kontynuować'}{' '}
                    </Button>
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
