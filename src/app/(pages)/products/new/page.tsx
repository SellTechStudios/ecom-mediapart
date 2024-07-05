import React from 'react'
import { draftMode } from 'next/headers'

import { ProductCategory, Page } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { Gutter } from '../../../_components/Gutter'
import { HR } from '../../../_components/HR'
import Filters from '../Filters'

const NewProducts = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: ProductCategory[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<ProductCategory>('product-category')
  } catch (error) {
    console.log(error)
  }

  return (
    <div>
      <Gutter>
        <Filters categories={categories} />
        <Blocks blocks={page?.layout} disableTopPadding={true} />
      </Gutter>
      <HR />
    </div>
  )
}

export default NewProducts
