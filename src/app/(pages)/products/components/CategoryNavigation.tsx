import React from 'react'
import { categoryFetchAll } from '../../../_api/productCategories'
import Link from 'next/link'

type CategoryNavigationProps = {
  id?: string
}

export const CategoryNavigation: React.FC = async ({ id }: CategoryNavigationProps) => {
  const data = await categoryFetchAll()

  return (
    <nav className="flex flex-col">
      {data.map(c => {
        return (
          <Link
            href={`/products/category/${c.id}`}
            className={id == c.id ? 'bg-black text-white' : ''}
          >
            {c.name}
          </Link>
        )
      })}
    </nav>
  )
}
