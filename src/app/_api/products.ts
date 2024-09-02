import { Product } from 'src/payload-types'
import { BuildRequest } from 'src/payload/utilities/graphqlUtils'

export const productFetchByErpId = async (erpId: string): Promise<Product> => {
  const body = {
    query: `query Product {
        Products(where: { erpId: { equals: "${erpId}" } }) {
          docs {
            id
            title
            description
            price
            pricePrevious
            vat
            weight
            quantity
            quantityMin
            quantityStep
            name
            code
            ean
            description
            keywords
            mediaVideo {
              url
            }
            mediaImages {
              url
            }
            manufacturer {
              name
            }
            warehouse {
              name
            }
            relatedProducts {
              id
              title
            }
            seoTitle
            seoImageUrl
            seoDescription
          }
        }
      }
    `,
  }
  const json = await BuildRequest(body)
  return json.data?.Products?.docs[0]
}

export const productFetchBySlug = async (slug: string): Promise<Product> => {
  const body = {
    query: `query Product {
        Products(where: { slug: { equals: "${slug}" } }) {
          docs {
            id
            title
            description
            price
            pricePrevious
            vat
            weight
            quantity
            quantityMin
            quantityStep
            name
            code
            ean
            description
            keywords
            mediaVideo {
              url
            }
            mediaImages {
              url
            }
            manufacturer {
              name
            }
            warehouse {
              name
            }
            relatedProducts {
              id
              title
            }
            seoTitle
            seoImageUrl
            seoDescription
          }
        }
      }
    `,
  }
  const json = await BuildRequest(body)
  return json.data?.Products?.docs[0]
}

export const productCreate = async (product: Product): Promise<number> => {
  const body = {
    variables: {
      product: product,
    },
    query: `mutation CreateProduct($product: mutationProductInput!) {
              createProduct(data: $product) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createProduct?.id as number
}

export const productUpdate = async (id: string, product: Product): Promise<number> => {
  const body = {
    variables: {
      product: product,
    },
    query: `mutation UpdateProduct($product: mutationProductUpdateInput!) {
              updateProduct(id: "${id}", data: $product) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.updateProduct?.id as number
}

export const productsLatest = async (count: number): Promise<Product[]> => {
  const body = {
    query: `query RecentProduct {
              Products(sort: "createdAt",  limit:${count} ) {
                  docs {
                    id
                    title
                    vat
                    price
                    name,
                    slug,
                    mediaImages {
                      isMain
                      url
                    }
                  }
                }
              }`,
  }
  const json = await BuildRequest(body)
  return json.data?.Products?.docs
}

export const productsBestsellers = async (count: number): Promise<Product[]> => {
  const body = {
    query: `query BestsellerProduct {
              Products(sort: "bestseller",  limit:${count} ) {
                  docs {
                    id
                    title
                    vat
                    price
                    name,
                    slug,
                    mediaImages {
                      isMain
                      url
                    }
                  }
                }
              }`,
  }
  const json = await BuildRequest(body)
  return json.data?.Products?.docs
}
