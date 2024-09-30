import { documentsBucket, manufacturerBucket, priceBucket, promotedBucket } from './buckets'
import { joinWithManufacturers } from './join'
import { toProductSearchItem, toSearchResults } from './project'

const stages = {
  project: {
    toProductSearchItem,
    toSearchResults,
  },
  join: {
    joinWithManufacturers,
  },
  buckets: {
    documentsBucket,
    manufacturerBucket,
    priceBucket,
    promotedBucket,
  },
}

export default stages
