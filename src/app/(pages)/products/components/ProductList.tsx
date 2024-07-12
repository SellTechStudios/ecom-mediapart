import { getPayloadClient } from '../../../../payload/getPayload'
import { Product } from '../../../../payload/payload-types'
import { Container } from '../../../_components/Container'
import Image from 'next/image'
import { type PipelineStage } from 'mongoose'

export type ProductItem = Pick<Product, 'id' | 'name' | 'ean' | 'price' | 'mediaImages'>

type ProductsListProps = {
  listType: 'all' | 'new' | 'outlet' | 'promoted' | 'quicksearch' | 'incategory' | 'quicksearch'
  searchString?: string
  categoryId?: string
}

const outputProject = {
  name: 1,
  price: 1,
  ean: 1,
  mediaImages: 1,
}

export const ProductsList = async ({ listType, searchString, categoryId }: ProductsListProps) => {
  const payload = await getPayloadClient()
  var productsCollectionModel = payload.db.collections['products']

  const aggregatesMap = {
    all: allProductAggregate,
    new: newProductAggregate,
    outlet: outletProductAggregate,
    promoted: promotedProductAggregate,
    quickSearch: quickSearchAggregate(searchString),
    incategory: inCategoryAggregate(categoryId),
  }

  const products = await productsCollectionModel.aggregate(aggregatesMap[listType])

  if (products?.length == 0) {
    return <h1>No products found</h1>
  }

  return (
    <Container>
      {products.map(p => (
        <div key={p.id}>
          <Image
            className="object-cover w-auto h-full"
            src={p.mediaImages[0].url}
            width={80}
            height={80}
            alt="Product Image"
            // sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            priority
          />
          <h2>{p.name}</h2>
          <p>{p.ean}</p>
          <p>{p.price}</p>
        </div>
      ))}
    </Container>
  )
}

const allProductAggregate: PipelineStage[] = [
  {
    $sort: {
      name: 1,
    },
  },
  {
    $project: outputProject,
  },
]

const outletProductAggregate: PipelineStage[] = [
  {
    $sort: {
      outlet: 1,
    },
  },
  {
    $project: outputProject,
  },
]

const newProductAggregate: PipelineStage[] = [
  {
    $sort: {
      createdAt: 1,
    },
  },
  {
    $project: outputProject,
  },
]

const promotedProductAggregate: PipelineStage[] = [
  {
    $sort: {
      createdAt: 1,
    },
  },
  {
    $limit: 10,
  },
  {
    $project: outputProject,
  },
]

const quickSearchAggregate = (searchString: string): PipelineStage[] => [
  {
    $search: {
      index: 'facets',
      text: {
        query: searchString,
        path: 'name',
      },
    },
  },
  {
    $project: outputProject,
  },
]

const inCategoryAggregate = (categoryId: string): PipelineStage[] => [
  {
    $sort: {
      createdAt: 1,
    },
  },
  {
    $limit: 10,
  },
  {
    $project: outputProject,
  },
]
