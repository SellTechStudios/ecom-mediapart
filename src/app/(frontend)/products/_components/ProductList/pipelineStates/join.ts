import { PipelineStage } from 'mongoose'

export const joinWithManufacturers: PipelineStage[] = [
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
