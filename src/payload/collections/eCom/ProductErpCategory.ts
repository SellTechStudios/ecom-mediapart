import { CollectionConfig } from 'payload'
import { admins } from 'src/payload/access/admins'

const ProductErpCategory: CollectionConfig = {
  slug: 'product-erp-category',
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
      name: 'erpName',
      type: 'select',
      options: [
        {
          label: 'FD Distribution',
          value: 'FDDistribution',
        },
      ],
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'categoryId',
      type: 'relationship',
      relationTo: 'product-category',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default ProductErpCategory
