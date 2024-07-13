import { categoryFetchAll } from '../../../../_api/productCategories'
import { Container } from '../../../../_components/Container'
import { CategoryNavigation } from '../../components/CategoryNavigation'
import { ProductsList } from '../../components/ProductList'
import { fetchProductsList } from '../../components/fetchProducts'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Product({ params: { id } }) {
  const products = await fetchProductsList({ listType: 'incategory', categoryId: id })
  const categories = await categoryFetchAll()
  return (
    <Container className="grid grid-cols-4">
      <CategoryNavigation categories={categories} id={id} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}

export async function generateStaticParams() {
  try {
    const categories = await categoryFetchAll()
    return categories?.map(({ id }) => id)
  } catch (error) {
    return []
  }
}
