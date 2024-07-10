import React from 'react'
import { categoryFetchAll } from '../../_api/productCategories'
import Link from 'next/link'

export const CategoryNavigation: React.FC = async () => {
  const data = await categoryFetchAll()
  return (
    <nav className="flex flex-col">
      {data.map(c => {
        return <Link href={`/products/category/${c.id}`}>{c.name}</Link>
      })}
    </nav>
  )
}
