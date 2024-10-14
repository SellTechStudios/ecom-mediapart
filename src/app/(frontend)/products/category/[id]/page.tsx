'use client'
import { ProductsList } from '@/components/ProductList'
import { useParams } from 'next/navigation'

const ProductListCategoryPage = () => {
  const params = useParams<{ id: string }>()

  return <ProductsList listType="incategory" categoryId={params.id} />
}

export default ProductListCategoryPage
