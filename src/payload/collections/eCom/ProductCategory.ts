import type { CollectionConfig } from 'payload/types'
import { admins } from '../../access/admins'

const ProductCategory: CollectionConfig = {
  slug: 'product-category',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
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
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'keywords',
      type: 'text',
    },
  ],
}

export default ProductCategory
