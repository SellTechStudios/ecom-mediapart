import { ProductsList } from '@/components/ProductList'
import { fetchCategories } from '@/services'

export default async function ProductListCategoryPage({ params }) {
  const categories = await fetchCategories()
  return <ProductsList listType="incategory" categoryId={params.id} categories={categories} />
}
