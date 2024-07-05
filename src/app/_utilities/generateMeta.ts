import type { Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'
import { CollectionMeta } from '../../payload/collections/_interfaces/collection-meta'

export const generateMeta = async (
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

// <!-- Primary Meta Tags -->
// <title>Matowe Szkło Hartowane...</title>
// <meta name="title" content="Matowe Szkło Hartowane..." />
// <meta name="description" content="Matowe Szkł..." />

// <!-- Open Graph / Facebook -->
// <meta property="og:type" content="website" />
// <meta property="og:url" content="https://mediapart.pl/127041-matowe-szklo.." />
// <meta property="og:title" content="Matowe Szkło..." />
// <meta property="og:description" content="Matowe Szkło..." />
// <meta property="og:image" content="https://metatags.io/images/meta-tags.png" />

// <!-- Twitter -->
// <meta property="twitter:card" content="summary_large_image" />
// <meta property="twitter:url" content="https://mediapart.pl/127041-matowe-szklo..." />
// <meta property="twitter:title" content="Matowe Szkło..." />
// <meta property="twitter:description" content="Matowe Szkło..." />
// <meta property="twitter:image" content="https://metatags.io/images/meta-tags.png" />
