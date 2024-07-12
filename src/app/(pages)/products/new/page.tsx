import { Container } from '../../../_components/Container'
import { CategoryNavigation } from '../components/CategoryNavigation'
import { ProductsList } from '../components/ProductList'

export default () => {
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation />
      <div className="col-span-3">
        <h1>New Products</h1>
        <ProductsList listType="new" />
      </div>
    </Container>
  )
}
