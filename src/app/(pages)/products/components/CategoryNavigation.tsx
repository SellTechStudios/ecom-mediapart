import Link from 'next/link'
import { ProductCategory } from '../../../../payload/payload-types'

type CategoryNavigationProps = {
  categories: ProductCategory[]
  id?: string
}

export const CategoryNavigation = ({ categories, id }: CategoryNavigationProps) => {
  return (
    <nav className="flex flex-col">
      {categories?.map(c => {
        return (
          <Link
            key={c.id}
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
