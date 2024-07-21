import Image from 'next/image'
import { Product } from '../../../../payload/payload-types'
import { Container } from '../../../_components/Container'

export type ProductItem = Pick<Product, 'id' | 'name' | 'ean' | 'price' | 'mediaImages'>

type ProductsListProps = {
  products: ProductItem[]
}

export const ProductsList = ({ products }: ProductsListProps) => {
  if (products?.length == 0) {
    return <h1>No products found</h1>
  }

  return (
    <Container>
      {products.map((p, index) => (
        <div key={index}>
          <Image
            className="object-cover w-auto h-full"
            src={p.mediaImages[0].url}
            width={80}
            height={80}
            alt="Product Image"
            // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
          <h2>{p.name}</h2>
          <p>{p.ean}</p>
          <p>{p.price}</p>
        </div>
      ))}
    </Container>
  )
}
