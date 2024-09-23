import { CategoryNavigation } from '@/(frontend)/products/_components/ProductList/category-navigation'
import { Container } from '@/components/Container'
import { ProductsList } from '@/(frontend)/products/_components/ProductList/ProductList'
import { fetchProductsList } from '@/(frontend)/products/_components/ProductList/fetchProducts'
import { fetchCategories } from './fetchCategories'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Product({ params: { id } }) {
  const products = await fetchProductsList({ listType: 'incategory', categoryId: id })
  const categories = await fetchCategories()

  return (
    <Container className="grid grid-cols-4 gap-4">
      <CategoryNavigation categories={categories} id={id} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories()
    return categories?.map(({ id }) => id)
  } catch (error) {
    return []
  }
}
