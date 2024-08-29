import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export type CategoryItem = {
  name: string
  _id: string
}

export const fetchCategories = async () => {
  const payload = await getPayloadHMR({ config })
  var collectionModel = payload.db.collections['product-category']

  const categories = await collectionModel.aggregate([
    {
      $sort: {
        name: 1,
      },
    },
  ])

  return categories
}
