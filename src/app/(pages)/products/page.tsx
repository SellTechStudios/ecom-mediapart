import { categoryFetchAll } from '../../_api/productCategories'
import { Container } from '../../_components/Container'
import { CategoryNavigation } from './components/CategoryNavigation'
import { ProductsList } from './components/ProductList'
import { fetchProductsList } from './components/fetchProducts'

export default async function ProductListPage() {
  const products = await fetchProductsList({ listType: 'all' })
  const categories = await categoryFetchAll()
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation categories={categories} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}
