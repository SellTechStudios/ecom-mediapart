import { ARCHIVE_BLOCK, CONTENT, MEDIA_BLOCK } from './blocks'
import { PRODUCT_CATEGORIES } from './categories'
import { META } from './meta'

export const PRODUCTS = `
  query Products {
    Products(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        ${PRODUCT_CATEGORIES}
        # enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`
//removed the following:
// # layout {
//   #  ${CALL_TO_ACTION}
//   #  ${CONTENT}
//   #  ${MEDIA_BLOCK}
//   #  ${ARCHIVE_BLOCK}
//   # }
// from the docs object of query above

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
//removed the following:
//${CALL_TO_ACTION}
//from the paywall object of the query above
