import { Container } from '@/components/Container'
import { ProductsList } from '@/components/ProductList/ProductList'
import { fetchProductsList } from '@/components/ProductList/fetchProducts'

export default async function SearchProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) {
  const q = searchParams?.text || ''
  const products = await fetchProductsList({ listType: 'quicksearch', searchString: q })
  return (
    <Container>
      <ProductsList products={products} />
    </Container>
  )
}
