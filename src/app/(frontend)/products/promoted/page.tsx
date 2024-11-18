import { ProductsList } from '@/components/ProductList'
import { fetchCategories } from '@/services'

export default async function PromotedProductListPage() {
  const categories = await fetchCategories()
  return <ProductsList listType="promoted" categories={categories} />
}
