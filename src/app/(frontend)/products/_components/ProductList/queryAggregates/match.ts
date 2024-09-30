export const outletMatch = () => ({
  outlet: true,
})

export const promotedMatch = () => ({
  isPromoted: { $eq: true },
})

export const inCategoryMatch = (erpCategoryId: string) => ({
  erpCategories: {
    $in: [erpCategoryId],
  },
})
