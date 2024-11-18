import { ProductsList } from '@/components/ProductList'

import { fetchCategories } from '@/services'

export default async function OutletProductListPage() {
  const categories = await fetchCategories()
  return <ProductsList listType="outlet" categories={categories} />
}
