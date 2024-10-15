import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { productFetchBySlug } from '@/_api/products'
import { AddToCartButton } from '@/components/AddToCartButton'
import { Container } from '@/components/Container'
import { ProductGallery } from '@/components/ProductDetails/ProductGallery'
import { ProductQuantitySelector } from '@/components/ProductQuantitySelector'
import { RemoveFromCartButton } from '@/components/RemoveFromCartButton'
import { formatCurrency } from '@/utilities/formatPrice'
import { generateProductMeta } from '@/utilities/generateProductMeta'
import { Product as ProductType } from 'src/payload-types'
import { CollectionMeta } from '../../../../payload/collections/_interfaces/collection-meta'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'

export const dynamic = 'force-dynamic'

export default async function Product({ params: { slug } }: { params: { slug: string } }) {
  const product: ProductType | null = await productFetchBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <section className="md:gap-4 md:grid md:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="text-3xl mt-4 md:mt-0">{product.name}</h1>
          <h2 className="text-red-600 text-2xl my-4">{formatCurrency(product.price)}</h2>
          <div className="flex gap-4 items-center">
            <AddToCartButton product={product} />
            <ProductQuantitySelector product={product} />
            <RemoveFromCartButton product={product} />
          </div>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </section>
    </Container>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => ({ slug: slug || '' })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: ProductType | null = null
  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  return generateProductMeta(product as CollectionMeta, product?.slug)
}
