import { draftMode } from 'next/headers'

import { Page, ProductCategory } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { Container } from '../../../_components/Container'
import { HR } from '../../../_components/HR'
import Filters from '../Filters'

const OutletProducts = async () => {
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
      <Container>
        <Filters categories={categories} />
        <Blocks blocks={page?.layout} disableTopPadding={true} />
      </Container>
      <HR />
    </div>
  )
}

export default OutletProducts
