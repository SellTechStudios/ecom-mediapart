import { useCart } from '@/providers/Cart'
import { formatCurrency } from '@/utilities/formatPrice'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from 'src/payload-types'

type ProductProps = {
  product: Product
}

export const ProductTile: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart } = useCart()

  return (
    <>
      <Link href={`/products/${product.slug}`}>
        <div>
          <Image
            src={product.mediaImages[0].url}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto mb-2"
            alt="Product Image"
            priority
          />
        </div>
        <p className="text-sm leading-4 font-light">{product.name}</p>
      </Link>
      <div className="flex flex-row justify-between align-middle mt-4">
        <p className="mt-2 font-bold">{formatCurrency(product.price)}</p>
        <button
          onClick={() => addItemToCart({ product: product, quantity: 1 })}
          className="flex items-center justify-center w-8 h-8 text-white bg-gray-500 rounded-sm shadow-lg cursor-pointer"
        >
          <ShoppingCartIcon className="size-5" />
        </button>
      </div>
    </>
  )
}
