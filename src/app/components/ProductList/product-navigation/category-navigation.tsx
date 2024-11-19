'use client'
import { cn } from '@/utilities'
import Link from 'next/link'
import { CategoryItem } from '../queries/fetchCategories'

type CategoryNavigationProps = {
  categories: CategoryItem[]
  categoryId?: string
  className?: string
}

export const CategoryNavigation = ({ categories, categoryId }: CategoryNavigationProps) => {
  return (
    <>
      <Link href="/products" className="w-fit">
        <h3 className="text-lg font-bold mb-2 mt-4">Kategorie</h3>
      </Link>
      <ul className="space-y-2 inline-block">
        {categories?.map((c) => {
          return (
            <li key={c._id}>
              <Link
                href={`/products/category/${c._id}`}
                className={cn('mb-2', categoryId == c._id ? 'font-semibold underline' : '')}
              >
                {c.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
