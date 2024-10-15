'use client'
import React, { useEffect, useRef, useState } from 'react'

import 'swiper/css'
import 'swiper/css/navigation'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Page, Product } from 'src/payload-types'
import { Autoplay, FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'
import { productsBestsellers, productsLatest } from '../../_api/products'
import { ProductSliderItem } from './ProductSliderItem'

type Props = Extract<Page['layout'][0], { blockType: 'productsSlider' }>

const breakpoints = {
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
}

export const ProductsSliderBlock: React.FC<Props> = (props) => {
  const { ProductsCount, ListType } = props
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const swiperRef = useRef<SwiperType>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const getHeader = () => {
    switch (ListType) {
      case 'Bestsellers':
        return <h4 className="mb-4 text-2xl">Bestsellers</h4>
      case 'Recent':
        return <h4 className="mb-4 text-2xl">Niedawno dodane</h4>
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      let productsData = []
      try {
        switch (ListType) {
          case 'Bestsellers':
            productsData = await productsBestsellers(ProductsCount)
            break
          case 'Recent':
            productsData = await productsLatest(ProductsCount)
            break
          default:
            productsData = []
        }
        setProducts(productsData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [ListType, ProductsCount])

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.params) {
      const swiper = swiperRef.current
      // @ts-ignore
      swiper.params.navigation.prevEl = prevRef.current
      // @ts-ignore
      swiper.params.navigation.nextEl = nextRef.current
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [products])
  if (loading) {
    return <ProductsSliderSkeleton />
  }

  if (products.length === 0) {
    return (
      <div className="container my-16">
        {getHeader()}
        <p>Brak produktów do wyświetlenia.</p>
      </div>
    )
  }
  return (
    <div className="container my-16">
      {getHeader()}
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          slidesPerView={1}
          spaceBetween={30}
          modules={[FreeMode, Navigation, Autoplay]}
          autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          loop={products.length >= 4}
          breakpoints={breakpoints}
        >
          {products.map((p) => (
            <SwiperSlide key={p.id} className="!h-auto">
              <ProductSliderItem product={p} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          ref={prevRef}
          className="absolute top-1/2 -left-5 transform -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          ref={nextRef}
          className="absolute top-1/2 -right-5 transform -translate-y-1/2 z-10
          w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center
          text-white transition-opacity duration-200 hover:bg-opacity-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

const ProductsSliderSkeleton = () => {
  const currentViewBreakpoint = window.innerWidth
  const slidesPerView =
    currentViewBreakpoint < 768
      ? 1
      : currentViewBreakpoint < 1024
        ? 2
        : currentViewBreakpoint < 1280
          ? 3
          : 4
  return (
    <div className="container my-16">
      <div className="relative">
        <div className="flex space-x-6 lg:space-x-9 overflow-hidden">
          {[...Array(slidesPerView)].map((_, index) => (
            <div key={index} className={slidesPerView === 1 ? 'w-full' : `w-1/${slidesPerView}`}>
              <div className="relative h-full bg-white rounded-lg overflow-hidden">
                <div className="animate-pulse">
                  <div className="h-[350px] bg-gray-300"></div>
                  <div className="p-4 h-24">
                    <div className="h-4 bg-gray-300 mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-300 w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
