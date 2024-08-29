import { PipelineStage } from 'mongoose'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

type ProductsListProps = {
  listType: 'new' | 'outlet' | 'promoted' | 'quicksearch' | 'incategory' | 'quicksearch'
  searchString?: string
  categoryId?: string
}

export const fetchProductsList = async ({
  listType,
  searchString,
  categoryId,
}: ProductsListProps) => {
  const payload = await getPayloadHMR({ config })
  var productsCollectionModel = payload.db.collections['products']

  const aggregatesMap = {
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
  isPromoted: { $cmp: ['$pricePrevious', '$price'] },
  name: 1,
  price: 1,
  pricePrevious: 1,
  ean: 1,
  mediaImages: 1,
  slug: 1,
}

const outletProductAggregate: PipelineStage[] = [
  {
    $match: {
      outlet: true,
    },
  },
  {
    $sort: {
      name: 1,
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
    $limit: 10,
  },
  {
    $project: outputProject,
  },
]

const promotedProductAggregate: PipelineStage[] = [
  {
    $project: outputProject,
  },
  {
    $match: {
      isPromoted: { $gt: 0 },
    },
  },
  {
    $sort: {
      name: 1,
    },
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
    $match: {
      erpCategories: {
        $in: ['66cd1400f6c359544273c7ac'],
      },
    },
  },
  {
    $sort: {
      name: 1,
    },
  },
  {
    $project: outputProject,
  },
]
