import { ProductsList } from '@/components/ProductList'

export default async function SearchProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const q = searchParams?.text || ''
  return <ProductsList listType="quicksearch" searchString={q} />
}
