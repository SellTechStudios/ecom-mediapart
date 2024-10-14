'use client'
import { Container } from '@/components/Container'
import { ProductTile } from '@/components/Product/ProductTile'
import { useEffect, useState } from 'react'
import { CategoryNavigation } from './category-navigation'
import { FacetCheckbox, FacetRanges } from './facets'
import { type FacetRange } from './facets/facet-ranges'
import { inCategoryMatch, outletMatch, promotedMatch } from './queryAggregates/match'
import { quickSearch } from './queryAggregates/search'
import { newProductsSort } from './queryAggregates/sort'

export type ProductsListProps = {
  listType: 'all' | 'new' | 'outlet' | 'promoted' | 'quicksearch' | 'incategory'
  searchString?: string
  categoryId?: string
}

export const ProductsList = (props: ProductsListProps) => {
  const { listType, searchString, categoryId } = props

  const [categories, setCategories] = useState<any>([])
  const [filterChecks, setFilterChecks] = useState<any>({ manufacturerId: [] })
  const [filterRanges, setFilterRanges] = useState<any>({ price: [] })
  const [facets, setFacets] = useState<any>({})
  const [products, setProducts] = useState<any>([])

  //initial category list load
  useEffect(() => {
    const fetchCategoriesEffect = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories`)
      const json = await response.json()

      setCategories(json)
    }

    fetchCategoriesEffect()
  }, [])

  //reload producs on filter changes
  useEffect(() => {
    const fetchProductsEffect = async () => {
      let match = {}
      let search = {}
      let sort = {}

      switch (listType) {
        case 'incategory':
          match = inCategoryMatch(categoryId)
          break
        case 'outlet':
          match = outletMatch()
          break
        case 'promoted':
          match = promotedMatch()
          break
        case 'new':
          sort = newProductsSort()
          break
        case 'quicksearch':
          search = quickSearch(searchString)
          break
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/search`, {
        method: 'POST',
        body: JSON.stringify({
          filterChecks,
          filterRanges,
          match,
          search,
          sort,
        }),
      })
      const json = await response.json()

      setProducts(json.documents)
      setFacets(json.meta)
    }

    fetchProductsEffect()
  }, [filterChecks, filterRanges])

  //handle different facet type changes
  const onFilterChecksChange = (prop: string, newValues: string[]) => {
    setFilterChecks((prevState) => ({
      ...prevState,
      [prop]: newValues,
    }))
  }

  const onFilterRangesChange = (prop: string, newValues: FacetRange[]) => {
    setFilterRanges((prevState) => ({
      ...prevState,
      [prop]: newValues,
    }))
  }

  return (
    <Container className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        {/* categories */}
        <CategoryNavigation categories={categories} />

        {/* facets */}
        <FacetCheckbox
          groupName="Producent"
          groupValues={facets.manufacturer}
          onChange={(e) => onFilterChecksChange('manufacturerId', e)}
        />
        <FacetRanges
          groupName="Cena"
          groupValues={facets.price}
          onChange={(e) => onFilterRangesChange('price', e)}
        />
      </div>
      <div className="md:col-span-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((p, index) => (
            <div key={index} className="flex flex-col justify-between">
              <ProductTile product={p} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}
