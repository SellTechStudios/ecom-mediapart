import { CategoryNavigation } from '@/components/CategoryNavigation'
import { Container } from '@/components/Container'
import { fetchProductsList } from '@/components/ProductList/fetchProducts'
import { ProductsList } from '@/components/ProductList/ProductList'
import { fetchCategories } from './category/[id]/fetchCategories'

export default async function ProductListPage() {
  const products = await fetchProductsList({ listType: 'all' })
  const categories = await fetchCategories()
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation categories={categories} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}
