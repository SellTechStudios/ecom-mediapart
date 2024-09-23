import BuildProductsQuery from '@/(frontend)/products/_components/ProductList/aggregateBuilder'
import { fetchCategories } from '@/(frontend)/products/category/[id]/fetchCategories'
import { PayloadHandler } from 'payload'

const searchProductsHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const products = await BuildProductsQuery(payload)

    return Response.json(products)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

const searchCategoriesHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const products = await fetchCategories(payload)

    return Response.json(products)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    return Response.json({ error: message }, { status: 500 })
  }
}

export { searchProductsHandler, searchCategoriesHandler }
