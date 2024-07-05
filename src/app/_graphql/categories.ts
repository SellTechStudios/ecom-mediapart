export const PRODUCT_CATEGORIES = `categories {
  title
  id
}`

export const CATEGORIES = `
  query ProductCategories {
    ProductCategories(limit: 300) {
      docs {
        id
        title
      }
    }
  }
`
