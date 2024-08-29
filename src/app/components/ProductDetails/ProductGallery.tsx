'use client'

import Image from 'next/image'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Product } from 'src/payload-types'

type ProductGalleryProps = {
  product: Product
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(product?.mediaImages[0].url)

  return (
    <div>
      <div className="relative w-full pb-[100%]">
        <Image
          src={selectedImage}
          alt="Selected Product Image"
          className="absolute top-0 left-0 w-full h-full"
          width={100}
          height={100}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />
      </div>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={10}
          navigation
          modules={[Navigation]}
          className="mt-4"
        >
          {product.mediaImages.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-0 pb-[100%]">
                <Image
                  onClick={() => setSelectedImage(img.url)}
                  className="absolute top-0 left-0 object-cover w-full h-full rounded-lg cursor-pointer"
                  src={img.url}
                  alt={`Product Image ${i + 1}`}
                  width={100}
                  height={100}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
