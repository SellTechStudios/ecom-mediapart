import { Container } from '../../../_components/Container'
import { ProductsList } from '../components/ProductList'

export default ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const q = searchParams?.text || ''

  return (
    <Container>
      <h1>Quick Search Results</h1>
      <ProductsList listType="quicksearch" searchString={q} />
    </Container>
  )
}
