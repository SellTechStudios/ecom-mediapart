'use client'

import { useFilter } from '@/providers/Filter'
import { ProductCategory } from 'src/payload-types'

import { RadioButton } from '@/components/Radio'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export const CategoryFilters = ({ categories }: { categories: ProductCategory[] }) => {
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter((id) => id !== categoryId)

      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const handleSort = (value: string) => setSort(value)

  return (
    <div>
      <h6>Kategorie Produktu</h6>
      <div>
        {categories?.map((category) => {
          const isSelected = categoryFilters.includes(category.id)

          return (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={isSelected}
                onCheckedChange={() => handleCategories(category.id)}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          )
        })}
      </div>
      <Separator />
      <h6>Sort By</h6>
      <div>
        <RadioButton
          label="Latest"
          value="-createdAt"
          isSelected={sort === '-createdAt'}
          onRadioChange={handleSort}
          groupName="sort"
        />
        <RadioButton
          label="Oldest"
          value="createdAt"
          isSelected={sort === 'createdAt'}
          onRadioChange={handleSort}
          groupName="sort"
        />
      </div>
    </div>
  )
}
