import { PipelineStage } from 'mongoose'
import { Payload } from 'payload'

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

const PRICE_BOUNDS = [0, 50, 100, 150, 200, 500]

const BuildProductsQuery = async (payload: Payload) => {
  var model = payload.db.collections['products']

  // Build the match object for filters
  let matchQuery = {}

  //   matchQuery['erpCategories'] = 1
  // matchQuery['price'] = { $gte: 1, $lte: 20 }

  const aggregate = productAggregate(matchQuery)
  const result = await model.aggregate(aggregate)
  return result[0] as unknown as ProductsListProps
}

const joinWithManufacturers: PipelineStage[] = [
  {
    //join with manufacturer
    $lookup: {
      from: 'manufacturers',
      localField: 'manufacturer',
      foreignField: '_id',
      as: 'manufacturer',
    },
  },
  {
    $unwind: {
      path: '$manufacturer',
    },
  },
]

const projectProduct: PipelineStage = {
  $project: {
    isPromoted: { $cmp: ['$pricePrevious', '$price'] },
    name: 1,
    price: 1,
    pricePrevious: 1,
    ean: 1,
    mediaImages: 1,
    slug: 1,
    manufacturer: '$manufacturer.name',
    manufacturerId: '$manufacturer._id',
  },
}

let productAggregate = (matchQuery): PipelineStage[] => [
  //apply input query
  { $match: matchQuery },
  { $limit: 5 },

  ...joinWithManufacturers,

  //narrow down product fields
  projectProduct,

  //apply facets
  {
    $facet: {
      // "documents" facet to return the actual search results and we keep it unchanged
      documents: [],
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
      Price: [
        {
          $bucket: {
            groupBy: '$price',
            boundaries: PRICE_BOUNDS,
            default: 'Other',
            output: {
              count: {
                $sum: 1,
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            count: 1,
            lowerBound: {
              $cond: [{ $eq: ['$_id', 'Other'] }, null, '$_id'],
            },
            upperBound: {
              $cond: [
                { $eq: ['$_id', 'Other'] },
                null,
                {
                  $arrayElemAt: [
                    PRICE_BOUNDS,
                    {
                      $add: [
                        {
                          $indexOfArray: [PRICE_BOUNDS, '$_id'],
                        },
                        1,
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  },

  //project to final structure with documents and facets stored separately
  {
    $project: {
      documents: 1,
      // Include the documents as they are
      meta: {
        price: '$Price',
        // Place the "price" facet under "meta"
        manufacturer: '$Manufacturer', // Place the "manufacturer" facet under "meta"
      },
    },
  },
]

export default BuildProductsQuery
