import { Container } from '../../_components/Container'
import { CategoryNavigation } from './components/CategoryNavigation'
import { ProductsList } from './components/ProductList'

export default () => {
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation />
      <div className="col-span-3">
        <ProductsList listType="all" />
      </div>
    </Container>
  )
}
