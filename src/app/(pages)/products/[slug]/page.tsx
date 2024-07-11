import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { CollectionMeta } from '../../../../payload/collections/_interfaces/collection-meta'
import { Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { productFetchBySlug } from '../../../_api/products'
import { AddToCartButton } from '../../../_components/AddToCartButton'
import { Container } from '../../../_components/Container'
import { ProductGallery } from '../../../_components/ProductDetails/ProductGallery'
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
      <section className="md:gap-4 md:grid md:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="leading-10 text-h1 font-h1">{product.name}</h1>
          <h2 className="text-red-600 text-h2 font-h2">
            {new Intl.NumberFormat('pl-PL', {
              style: 'currency',
              currency: 'PLN',
            }).format(product.price)}
          </h2>
          <AddToCartButton product={product} />
        </div>
      </section>
      <section className="h-full mt-8">
        <h1 className="text-h3 font-h3">Opis Produktu</h1>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </section>
    </Container>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => ({ slug })) || []
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
