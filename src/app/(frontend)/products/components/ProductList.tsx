import { Container } from '@/components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Settings } from 'src/payload-types'

export type ProductItem = Pick<Product, 'id' | 'name' | 'ean' | 'price' | 'mediaImages' | 'slug'>

type ProductsListProps = {
  products: ProductItem[]
}

export const ProductsList = async ({ products }: ProductsListProps) => {
  if (products?.length == 0) {
    return <div className="p-5 bg-orange-100 rounded-lg">Nie znaloeziono produktów</div>
  }

  return (
    <Container className="grid grid-cols-4 gap-12">
      {products.map((p, index) => (
        <Link key={index} href={`/products/${p.slug}`}>
          <Image
            className="w-auto"
            src={p.mediaImages[0].url}
            width={0}
            height={0}
            alt="Product Image"
            priority
          />
          <p className="text-sm leading-4 font-light">{p.name}</p>
          <p className="mt-2 font-bold">{p.price} PLN</p>
        </Link>
      ))}
    </Container>
  )
}
