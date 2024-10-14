import { fetchCategories, fetchProducts } from '@/components/ProductList/queries'
import { type PayloadHandler } from 'payload'

const searchProductsHandler: PayloadHandler = async (req): Promise<Response> => {
  const { payload } = req

  try {
    const filters = await req.json()
    const products = await fetchProducts(payload, filters)

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

export { searchCategoriesHandler, searchProductsHandler }
