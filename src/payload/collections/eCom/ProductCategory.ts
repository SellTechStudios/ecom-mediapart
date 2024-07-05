import type { CollectionConfig } from 'payload/types'

const ProductCategory: CollectionConfig = {
  slug: 'product-category',
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
