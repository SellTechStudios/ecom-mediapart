'use client'
import { Container } from '@/components/Container'
import { ProductTile } from '@/components/Product/ProductTile'
import { useEffect, useState } from 'react'
import { CategoryDrawer } from './navigation-drawers/category-drawer'
import { FilterDrawer } from './navigation-drawers/filter-drawer'
import { CategoryNavigation } from './product-navigation/category-navigation'
import ManufacturerNavigation from './product-navigation/manufacturer-navigation'
import PriceNavigation, { PriceRange } from './product-navigation/price-navigation'
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
  const [manufacturerFilter, setFilterChecks] = useState<any>({ manufacturerId: [] })
  const [priceFilter, setFilterRanges] = useState<any>({ price: [] })
  const [facets, setFacets] = useState<any>({})
  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    const fetchCategoriesEffect = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/categories`)
      const json = await response.json()

      setCategories(json)
    }

    fetchCategoriesEffect()
  }, [])

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
          filterChecks: manufacturerFilter,
          filterRanges: priceFilter,
          match,
          search,
          sort,
        }),
      })
      const json = await response.json()

      if (
        Object.keys(facets).length === 0 &&
        facets.constructor === Object &&
        Object.keys(json.meta).length > 0
      ) {
        setFacets(json.meta)
      }
      setProducts(json.documents)
    }

    fetchProductsEffect()
  }, [manufacturerFilter, priceFilter, listType, searchString, categoryId, setFacets, facets])

  const onManufacturerChange = (prop: string, newValues: string[]) => {
    setFilterChecks((prevState) => ({
      ...prevState,
      [prop]: newValues,
    }))
  }

  const onPriceRangesChange = (prop: string, newValues: PriceRange[]) => {
    setFilterRanges((prevState) => ({
      ...prevState,
      [prop]: newValues,
    }))
  }

  return (
    <Container className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <div className="hidden md:flex flex-col">
          <CategoryNavigation categories={categories} categoryId={categoryId} />

          <ManufacturerNavigation
            groupName="Producent"
            groupValues={facets.manufacturer}
            selectedValues={manufacturerFilter.manufacturerId}
            onChange={(e) => onManufacturerChange('manufacturerId', e)}
          />
          <PriceNavigation
            selectedRanges={priceFilter.price}
            groupName="Cena"
            groupValues={facets.price}
            onChange={(e) => onPriceRangesChange('price', e)}
          />
        </div>
      </div>
      <div className="md:col-span-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2 className="col-span-full text-4xl">Produkty</h2>
          <div className="col-span-full flex md:hidden gap-4">
            <CategoryDrawer categories={categories} categoryId={categoryId} />
            <FilterDrawer
              facets={facets}
              manufacturerFilters={manufacturerFilter.manufacturerId}
              priceFilters={priceFilter.price}
              onManufacturerChange={onManufacturerChange}
              onPriceRangesChange={onPriceRangesChange}
            />
          </div>
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
