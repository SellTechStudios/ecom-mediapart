import { Container } from '@/components/Container'
import { CategoryNavigation } from '../components/CategoryNavigation'
import { ProductsList } from '../components/ProductList'
import { fetchProductsList } from '../components/fetchProducts'
import { fetchCategories } from '../category/[id]/fetchCategories'

export default async function NewProductListPage() {
  const products = await fetchProductsList({ listType: 'new' })
  const categories = await fetchCategories()

  return (
    <Container className="grid grid-cols-4 gap-4">
      <CategoryNavigation categories={categories} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}
