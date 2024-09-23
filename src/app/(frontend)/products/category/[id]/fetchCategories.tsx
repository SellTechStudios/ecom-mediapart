import { Payload } from 'payload'

export type CategoryItem = {
  name: string
  _id: string
}

export const fetchCategories = async (payload: Payload) => {
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
