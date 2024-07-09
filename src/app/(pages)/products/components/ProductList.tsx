import { Product } from '../../../../payload/payload-types'
import { Container } from '../../../_components/Container'
import Image from 'next/image'

export type ProductItem = Pick<Product, 'name' | 'ean' | 'price' | 'mediaImages'>

type ProductsListProps = {
  searchText: string
  endpointName: string
}

export const ProductsList = async ({ searchText, endpointName }: ProductsListProps) => {
  const response = await fetch(`${endpointName}?text=${searchText}`)
  const products = (await response.json()) as ProductItem[]

  if (products?.length == 0) {
    return <h1>No products found</h1>
  }

  return (
    <Container>
      {products.map(p => (
        <div>
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
