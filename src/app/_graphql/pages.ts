import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  MEDIA_BLOCK,
  PRODUCTS_SLIDER_BLOCK,
} from './blocks'

export const PAGES = `
  query Pages {
    Pages(limit: 300, where: { slug: { not_equals: "cart" } })  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
      docs {
        id
        title
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${PRODUCTS_SLIDER_BLOCK}
        }
      }
    }
  }
`
