import type { Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'
import { CollectionMeta } from '../../payload/collections/_interfaces/collection-meta'

export const generateProductMeta = async (
  meta: CollectionMeta,
  slug: string | string[],
): Promise<Metadata> => {
  const ogImage = meta?.seoImageUrl

  return {
    title: meta?.seoTitle || 'Mediapart',
    description: meta?.seoDescription,
    openGraph: mergeOpenGraph({
      title: meta?.seoTitle || 'Mediapart',
      description: meta?.seoDescription,
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
