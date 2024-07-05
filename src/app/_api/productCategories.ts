import type { ProductCategory } from '../../payload/payload-types'
import { BuildRequest } from '../../payload/utilities/graphqlUtils'

export const categoryFetchByErpId = async (erpId: string): Promise<ProductCategory> => {
  const body = {
    query: `query ProductCategories {
        ProductCategories (where: { erpId: { equals: "${erpId}" }}) {
          docs {
            id
            erpId
            name
            title
            description
            keywords
          }
        }
      }`,
  }
  const json = await BuildRequest(body)
  return json.data?.ProductCategories?.docs[0]
}

export const categoryCreate = async (category: ProductCategory): Promise<number> => {
  const body = {
    variables: {
      category: category,
    },
    query: `mutation CreateProductCategory($category: mutationProductCategoryInput!) {
              createProductCategory(data: $category) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createProductCategory?.id as number
}

export const categoryUpdate = async (id: string, category: ProductCategory): Promise<number> => {
  const body = {
    variables: {
      category: category,
    },
    query: `mutation UpdateProductCategory($category: mutationProductCategoryUpdateInput!) {
              updateProductCategory(id: "${id}", data: $category) { id }
            }`,
  }

  let json = await BuildRequest(body)
  return json?.data?.createProductCategory?.id as number
}
