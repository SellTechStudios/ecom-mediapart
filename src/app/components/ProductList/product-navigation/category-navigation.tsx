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
    <div className="flex flex-col">
      {categories?.map((c) => {
        return (
          <Link
            key={c._id}
            href={`/products/category/${c._id}`}
            className={cn('pb-2', categoryId == c._id ? 'font-bold' : '')}
          >
            {c.name}
          </Link>
        )
      })}
    </div>
  )
}
