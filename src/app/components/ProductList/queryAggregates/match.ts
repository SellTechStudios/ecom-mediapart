import ObjectID from 'bson-objectid'

export const outletMatch = () => ({
  outlet: true,
})

export const promotedMatch = () => ({
  isPromoted: { $eq: true },
})

export const inCategoryMatch = (categoryId: string) => ({
  Category: { $eq: ObjectID(categoryId) },
})
