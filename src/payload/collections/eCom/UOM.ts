import type { CollectionConfig } from 'payload/types'

const UOMs: CollectionConfig = {
  slug: 'uom',
  admin: {
    useAsTitle: 'Units of Measure',
  },
  fields: [
    {
      name: 'erpId',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}

export default UOMs
