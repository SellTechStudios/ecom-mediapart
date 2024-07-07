import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'

type ProductSliderItemProps = {
  product: Product
}

export const ProductSliderItem: React.FC<ProductSliderItemProps> = ({
  product,
}: ProductSliderItemProps) => {
  const { addItemToCart, cart } = useCart()

  return (
    <div className="relative h-full group">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col items-center self-stretch justify-between h-full transition-all duration-200 ease-in-out rounded-sm hover:shadow-lg"
      >
        {product.mediaImages[0] && (
          <Image
            className="object-cover w-auto h-full"
            src={product.mediaImages[0].url}
            width={100}
            height={280}
            alt="Product Image"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
        )}

        <div className="flex flex-col h-full p-2 transition-all duration-200 ease-in-out group-hover:bg-gray-300">
          <p className="h-full font-bold">{product.name}</p>
          <p className="mt-4">
            {new Intl.NumberFormat('pl-PL', {
              style: 'currency',
              currency: 'PLN',
            }).format(product.price)}
          </p>
        </div>
      </Link>
      <div className="absolute transition-opacity duration-200 ease-in-out opacity-0 top-2 right-2 group-hover:opacity-100">
        <button
          onClick={() => addItemToCart({ product, quantity: 1 })}
          className="flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-sm shadow-lg cursor-pointer"
        >
          <ShoppingCartIcon className="size-5" />
        </button>
      </div>
    </div>
  )
}
