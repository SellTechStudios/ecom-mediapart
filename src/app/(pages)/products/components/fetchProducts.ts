import { PipelineStage } from 'mongoose'
import { getPayloadClient } from '../../../../payload/getPayload'

type ProductsListProps = {
  listType: 'all' | 'new' | 'outlet' | 'promoted' | 'quicksearch' | 'incategory' | 'quicksearch'
  searchString?: string
  categoryId?: string
}

export const fetchProductsList = async ({
  listType,
  searchString,
  categoryId,
}: ProductsListProps) => {
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

  return products
}

const outputProject = {
  name: 1,
  price: 1,
  ean: 1,
  mediaImages: 1,
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
