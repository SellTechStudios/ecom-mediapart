'use client'
import { ProductsList } from '../../_components/ProductList/product-list'
import { useParams } from 'next/navigation'

export default () => {
  const params = useParams<{ id: string }>()

  return <ProductsList listType="incategory" categoryId={params.id} />
}
