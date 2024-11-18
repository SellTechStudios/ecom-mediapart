import { ProductsList } from '@/components/ProductList'
import { fetchCategories } from '@/services'
export default async function SearchProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const q = searchParams?.text || ''
  const categories = await fetchCategories()
  return <ProductsList listType="quicksearch" searchString={q} categories={categories} />
}
