'use client'
import React, { useEffect, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'

import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Page, Product } from '../../../payload/payload-types'
import { productsBestsellers, productsLatest } from '../../_api/products'
import { ProductSliderItem } from './ProductSliderItem'

type Props = Extract<Page['layout'][0], { blockType: 'productsSlider' }>

export const ProductsSliderBlock: React.FC<Props> = props => {
  const { ProductsCount, ListType } = props
  const [products, setProducts] = useState<Product[]>([])

  const getHeader = () => {
    switch (ListType) {
      case 'Bestsellers':
        return <h4 className="mb-4 text-h4 font-h4">Bestsellers</h4>
      case 'Recent':
        return <h4 className="mb-4 text-h4 font-h4">Niedawno dodane</h4>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let products = []
      switch (ListType) {
        case 'Bestsellers':
          products = await productsBestsellers(ProductsCount)
        case 'Recent':
          products = await productsLatest(ProductsCount)
      }
      setProducts(products)
    }

    fetchData().catch(console.error)
  }, [])

  return (
    <div>
      {getHeader()}

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        modules={[FreeMode, Navigation]}
        autoplay={true}
        navigation={true}
        loop={products.length >= 4}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        style={{ paddingLeft: '20px', paddingRight: '20px' }}
      >
        {products.map(p => (
          <SwiperSlide key={p.id} className="!h-auto">
            <ProductSliderItem product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
