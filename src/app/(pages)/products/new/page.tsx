import { EndpointNames } from '../../../../payload/endpoints'
import { CategoryNavigation } from '../../../_components'
import { Container } from '../../../_components/Container'
import { ProductsList } from '../components/ProductList'

export default async () => {
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation />
      <div className="col-span-3">
        <h1>New Products</h1>
        <ProductsList endpointName={EndpointNames.Products.New} />
      </div>
    </Container>
  )
}
