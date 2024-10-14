import { Media } from '@/components/Media'
import Image from 'next/image'
import Link from 'next/link'
type CheckoutItemProps = {
  product: any
  title: string
  metaImage: string
  quantity: number
  index: number
}
export const CheckoutItem = ({ product, title, metaImage, quantity, index }: CheckoutItemProps) => {
  return (
    <li
      className="grid grid-cols-[100px_5fr_1fr_1fr] py-4 gap-4 border-b border-gray-300 "
      key={index}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex items-center relative min-h-[80px] bg-gray-300"
      >
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' ? (
          <Media
            className="relative h-full"
            imgClassName="object-contain max-w-full aspect-square"
            resource={metaImage}
            fill
          />
        ) : (
          <Image
            src={metaImage}
            alt={product.alt ? product.alt : 'Product Image'}
            width={100}
            height={100}
          />
        )}
      </Link>

      <div className="self-center truncate">{title}</div>

      <div className="flex items-center justify-center text-lg text-center sm:text-base">
        x{quantity}
      </div>

      <div className="flex items-center justify-end">
        {new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency: 'PLN',
        }).format(product.price * quantity)}
      </div>
    </li>
  )
}
