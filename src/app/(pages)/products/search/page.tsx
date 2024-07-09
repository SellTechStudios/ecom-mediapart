import { EndpointNames } from '../../../../payload/endpoints'
import { Container } from '../../../_components/Container'
import { ProductsList } from '../components/ProductList'

export default async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined }
}) => {
  const q = searchParams?.text || ''

  return (
    <Container>
      <h1>Quick Search Results</h1>
      <ProductsList searchText={q} endpointName={EndpointNames.Products.QuickSearch} />
    </Container>
  )
}
