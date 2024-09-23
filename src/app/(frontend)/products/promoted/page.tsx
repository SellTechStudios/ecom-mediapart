import { CategoryNavigation } from '@/(frontend)/products/_components/ProductList/category-navigation'
import { Container } from '@/components/Container'
import { fetchProductsList } from '@/(frontend)/products/_components/ProductList/fetchProducts'
import { ProductsList } from '@/(frontend)/products/_components/ProductList/ProductList'
import { fetchCategories } from '../category/[id]/fetchCategories'

export default async function PromotedProductsPage() {
  const products = await fetchProductsList({ listType: 'promoted' })
  const categories = await fetchCategories()
  return (
    <Container className="grid grid-cols-4 gap-4">
      <CategoryNavigation categories={categories} />
      <div className="col-span-3">
        <ProductsList products={products} />
      </div>
    </Container>
  )
}
