import { EndpointNames } from '../../../../payload/endpoints'
import { Container } from '../../../_components/Container'
import { ProductsList } from '../components/ProductList'

export default async () => {
  return (
    <Container>
      <h1>Outlet Products</h1>
      <ProductsList endpointName={EndpointNames.Products.Outlet} />
    </Container>
  )
}
