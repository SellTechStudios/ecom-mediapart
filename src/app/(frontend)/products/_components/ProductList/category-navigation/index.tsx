import { cn } from '@/utilities/cn'
import Link from 'next/link'
import { CategoryItem } from '../queries/fetchCategories'

type CategoryNavigationProps = {
  categories: CategoryItem[]
  id?: string
}

export const CategoryNavigation = ({ categories, id }: CategoryNavigationProps) => {
  return (
    <nav className="flex flex-col">
      {categories?.map((c) => {
        return (
          <Link
            key={c._id}
            href={`/products/category/${c._id}`}
            className={cn('p-2', id == c._id ? 'bg-orange-700 text-white' : '')}
          >
            {c.name}
          </Link>
        )
      })}
    </nav>
  )
}
