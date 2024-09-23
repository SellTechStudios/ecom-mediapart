'use client'
import { Container } from '@/components/Container'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CategoryNavigation } from './category-navigation'
import { FacetCheckbox, FacetRanges } from './facets'

export const ProductsList = () => {
  const [categories, setCategories] = useState<any>([])
  const [filters, setFilters] = useState<any>({ manufacturers: [], price: [] })
  const [products, setProducts] = useState<any>([])
  const [facets, setFacets] = useState<any>({})

  useEffect(() => {
    const fetchCategoriesEffect = async () => {
      const response = await fetch('http://localhost:3000/api/products/categories')
      const json = await response.json()

      setCategories(json)
    }

    fetchCategoriesEffect()
  }, [])

  useEffect(() => {
    const fetchProductsEffect = async () => {
      // const queryParams = new URLSearchParams(filters).toString()
      const response = await fetch('http://localhost:3000/api/products/search')
      const json = await response.json()

      setProducts(json.documents)
      setFacets(json.meta)
    }

    fetchProductsEffect()
  }, [filters])

  const onFilterChange = (prop: string, newValues: string[]) => {
    setFilters((prevState) => ({
      ...prevState,
      [prop]: newValues,
    }))
  }

  return (
    <Container className="grid grid-cols-4">
      <div>
        <FacetCheckbox
          groupName="Producent"
          groupValues={facets.manufacturer}
          onChange={(e) => onFilterChange('manufacturers', e)}
        />
        <FacetRanges
          groupName="Cena"
          groupValues={facets.price}
          onChange={(e) => onFilterChange('price', e)}
        />
        <CategoryNavigation categories={categories} />
        {/* <Facets facets={facets} onFilterChange={setFilters} /> */}
      </div>
      <div className="col-span-3">
        <pre>{JSON.stringify(filters)}</pre>
        {products.map((p, index) => (
          <Link key={index} href={`/products/${p.slug}`}>
            <Image
              className="w-auto"
              src={p.mediaImages[0].url}
              width={50}
              height={50}
              alt="Product Image"
              priority
            />
            <p className="text-sm leading-4 font-light">{p.name}</p>
            <p className="mt-2 font-bold">{p.price} PLN</p>
          </Link>
        ))}
      </div>
    </Container>
  )
}
