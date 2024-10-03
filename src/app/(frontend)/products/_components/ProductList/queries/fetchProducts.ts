import ObjectID from 'bson-objectid'
import { PipelineStage } from 'mongoose'
import { Payload } from 'payload'
import { FacetRange } from '../facets/facet-ranges'
import stages from '../pipelineStates'

const PRICE_BOUNDS = [0, 50, 100, 150, 200, 500]
const PAGE_SIZE = 5

type ProductItem = {
  isPromoted: boolean
  name: string
  price: string
  pricePrevious: string
  ean: string
  mediaImages: MediaImage[]
  slug: string
  manufacturer: string
}

type ProductsListProps = {
  meta: any
  documents: ProductItem[]
}

const fetchProducts = async (payload: Payload, filters: any) => {
  var model = payload.db.collections['products']

  // Build the match object for filters
  let matchQuery = {}

  //apply value filters
  for (const [key, value] of Object.entries(filters.filterChecks) as [string, string[]][]) {
    value?.forEach((v) => {
      matchQuery[key] = { $eq: ObjectID(v) }
    })
  }

  //apply range filters match
  for (const [key, value] of Object.entries(filters.filterRanges) as [string, FacetRange[]][]) {
    value?.forEach((v) => {
      matchQuery[key] = { $gte: v.lowerBound, $lte: v.upperBound }
    })
  }

  //apply filters dependent on the list type that we get in request body
  matchQuery = Object.assign(matchQuery, filters.match)
  const aggregate = productAggregate(matchQuery)

  console.log(aggregate)

  const result = await model.aggregate(aggregate)
  return result[0] as unknown as ProductsListProps
}

let productAggregate = (matchQuery): PipelineStage[] => [
  //apply input query
  { $match: matchQuery },

  ...stages.join.joinWithManufacturers,

  //narrow down product fields
  stages.project.toProductSearchItem,

  //apply facets
  {
    $facet: {
      ...stages.buckets.documentsBucket(PAGE_SIZE),
      ...stages.buckets.priceBucket(PRICE_BOUNDS),
      Manufacturer: [
        {
          $group: {
            _id: {
              id: '$manufacturerId',
              name: '$manufacturer',
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1, '_id.name': 1 },
        },
        {
          $project: {
            _id: 0,
            id: '$_id.id',
            name: '$_id.name',
            count: 1,
          },
        },
      ],
      Promoted: [
        {
          $group: {
            _id: {
              id: '$isPromoted',
              name: {
                $cond: [{ $eq: ['$isPromoted', true] }, 'Promocja', 'Cena regularna'],
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $project: {
            _id: 0,
            name: '$_id.name',
            count: 1,
          },
        },
      ],
    },
  },

  //project to final structure with documents and facets stored separately
  stages.project.toSearchResults,
]

export default fetchProducts
