import { outletMatch, promotedMatch, inCategoryMatch } from './match'
import { quickSearch } from './search'
import { newProductsSort } from './sort'

const aggregates = {
  match: { outletMatch, promotedMatch, inCategoryMatch },
  search: { quickSearch },
  sort: { newProductsSort },
}

export default aggregates
