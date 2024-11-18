import { ProductsList } from '@/components/ProductList'
import { fetchCategories } from '@/services'

export default async function ProductListCategoryPage() {
  const categories = await fetchCategories()
  return <ProductsList listType="all" categories={categories} />
}
