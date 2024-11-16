import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/Cart'
import { formatCurrency } from '@/utilities/formatPrice'
import { CircleCheckBig, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from 'src/payload-types'

type ProductProps = {
  product: Product
}

export const ProductTile: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const isInCart = isProductInCart(product)
  return (
    <div className="flex flex-col h-full">
      <Link href={`/products/${product.slug}`} className="relative group">
        <div className="relative">
          <Image
            src={product.mediaImages[0].url}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto mb-2 rounded-lg p-4"
            alt="Product Image"
            priority
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-b-lg"></div>
          <p className="absolute bottom-2 right-2 text-white font-sans text-lg">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
      <p className="text-sm leading-4 font-semibold">{product.name}</p>
      <div className="flex justify-center mt-auto">
        <Button
          onClick={!isInCart ? () => addItemToCart({ product, quantity: 1 }) : undefined}
          href={isInCart ? '/cart' : undefined}
          className="mt-2 w-full"
        >
          {!isInCart && <ShoppingCart className="mr-3 block sm:hidden xl:block" />}
          {isInCart && <CircleCheckBig className="mr-3 block sm:hidden xl:block" />}
          <span className="hidden sm:block ml-0 xl:ml-2">
            {isInCart ? 'Pokaż w koszyku' : 'Dodaj do koszyka'}
          </span>
        </Button>
      </div>
    </div>
  )
}
