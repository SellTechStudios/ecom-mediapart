import { Button } from '@/components/ui/button'
import { useCart } from '@/providers/Cart'
import { formatCurrency } from '@/utilities/formatPrice'
import { CircleCheckBig, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from 'src/payload-types'

type ProductSliderItemProps = {
  product: Product
}

export const ProductSliderItem: React.FC<ProductSliderItemProps> = ({
  product,
}: ProductSliderItemProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const isInCart = isProductInCart(product)
  return (
    <div className="relative h-full group/container bg-white rounded-lg">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-col items-center self-stretch justify-between h-full transition-all duration-200 ease-in-out rounded-lg"
      >
        {product.mediaImages[0] && (
          <Image
            className="object-cover w-auto h-[350px] rounded-t-lg"
            src={product.mediaImages[0].url}
            width={100}
            height={280}
            alt="Product Image"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
        )}

        <div className="flex flex-col p-2 transition-all duration-200 ease-in-out flex-1 px-4">
          <p className="h-full text-sm line-clamp-3 dark:text-gray-700">{product.name}</p>
          <p className="mt-2 font-bold text-red-500">{formatCurrency(product.price)}</p>
        </div>
      </Link>
      <div className="absolute inset-0 bg-slate-950 bg-opacity-40 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none rounded-lg"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-in-out opacity-0 group-hover/container:opacity-100">
        <Button
          onClick={!isInCart ? () => addItemToCart({ product, quantity: 1 }) : undefined}
          href={isInCart ? '/cart' : undefined}
          className="max-w-[200px] w-full"
        >
          {!isInCart && <ShoppingCart className="mr-3" />}
          {isInCart && <CircleCheckBig className="mr-3" />}
          {isInCart ? `Pokaż w koszyku` : `Dodaj do koszyka`}
        </Button>
      </div>
    </div>
  )
}
