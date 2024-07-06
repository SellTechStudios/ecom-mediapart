import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { CollectionMeta } from '../../../../payload/collections/_interfaces/collection-meta'
import { Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { productFetchBySlug } from '../../../_api/products'
import { AddToCartButton } from '../../../_components/AddToCartButton'
import { Container } from '../../../_components/Container'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Product({ params: { slug } }) {
  let product: ProductType | null = null

  try {
    product = await productFetchBySlug(slug)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-row items-start">
          {product.mediaImages.map((img, i) => (
            <Image key={i} src={img.url} width={100} height={100} alt={''} />
          ))}
        </div>
        <div>
          <h1>{product.name}</h1>
          <h2>{product.price} PLN</h2>
          <AddToCartButton product={product} />
        </div>
        <div className="col-span-2">
          <h1>Opis Produktu</h1>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </Container>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: ProductType | null = null
  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta(product as CollectionMeta, product?.slug)
}
