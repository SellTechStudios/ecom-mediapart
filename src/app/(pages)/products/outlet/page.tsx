import { categoryFetchAll } from '../../../_api/productCategories'
import { Container } from '../../../_components/Container'
import { CategoryNavigation } from '../components/CategoryNavigation'
import { ProductsList } from '../components/ProductList'
import { fetchProductsList } from '../components/fetchProducts'

export default async function OutletProductsPage() {
  const products = await fetchProductsList({ listType: 'outlet' })
  const categories = await categoryFetchAll()
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation categories={categories} />
      <div className="col-span-3">
        <h1>Outlet Products</h1>
        <ProductsList products={products} />
      </div>
    </Container>
  )
}
