import type { CollectionConfig } from 'payload/types'

const Warehouse: CollectionConfig = {
  slug: 'warehouses',
  admin: {
    useAsTitle: 'name',
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
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default Warehouse
