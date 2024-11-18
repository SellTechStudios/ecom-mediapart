import { ProductsList } from '@/components/ProductList'

import { fetchCategories } from '@/services'

export default async function NewProductsListPage() {
  const categories = await fetchCategories()
  return <ProductsList listType="new" categories={categories} />
}
