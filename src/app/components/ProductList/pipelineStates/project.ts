import { PipelineStage } from 'mongoose'

export const toProductSearchItem: PipelineStage = {
  $project: {
    id: '$_id',
    isPromoted: {
      $gt: ['$pricePrevious', '$price'],
    },
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

export const toSearchResults: PipelineStage = {
  $project: {
    documents: 1,
    meta: {
      price: '$Price',
      manufacturer: '$Manufacturer',
      priceType: '$Promoted',
    },
  },
}
