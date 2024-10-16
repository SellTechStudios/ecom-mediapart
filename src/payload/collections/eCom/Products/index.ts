import { CollectionConfig } from 'payload'
import { admins } from '../../../access/admins'
import { slugField } from '../../../fields/slug'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { searchCategoriesHandler, searchProductsHandler } from '@/_api/product-list'

const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status'],
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  endpoints: [
    {
      path: '/search',
      method: 'post',
      handler: searchProductsHandler,
    },
    {
      path: '/categories',
      method: 'get',
      handler: searchCategoriesHandler,
    },
  ],
  hooks: {
    // beforeChange: [beforeProductChange],
    afterChange: [revalidateProduct],
    // afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Product Details',
          fields: [
            {
              name: 'erpId',
              type: 'text',
            },
            {
              name: 'price',
              type: 'number',
            },
            {
              name: 'pricePrevious',
              type: 'number',
            },
            {
              name: 'vat',
              type: 'number',
            },
            {
              name: 'weight',
              type: 'number',
            },
            {
              name: 'quantity',
              type: 'number',
            },
            {
              name: 'quantityMin',
              type: 'number',
            },
            {
              name: 'quantityStep',
              type: 'number',
            },
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'code',
              type: 'text',
            },
            {
              name: 'ean',
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
            {
              name: 'bestseller',
              type: 'checkbox',
            },
            {
              name: 'outlet',
              type: 'checkbox',
            },
            {
              name: 'specialOffer',
              label: 'Special Offer',
              type: 'checkbox',
            },
            {
              name: 'mediaVideo',
              label: 'Videos',
              type: 'array',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
            {
              name: 'mediaImages',
              label: 'Images',
              type: 'array',
              fields: [
                {
                  name: 'url',
                  type: 'text',
                },
                {
                  name: 'isMain',
                  type: 'checkbox',
                },
              ],
            },
          ],
        },
        {
          label: 'Related Products',
          fields: [
            {
              name: 'relatedProducts',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'seoTitle',
              label: 'Title',
              type: 'text',
            },
            {
              name: 'seoDescription',
              label: 'description',
              type: 'textarea',
            },
            {
              name: 'seoImageUrl',
              label: 'Image Url',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      label: 'ERP Categories',
      name: 'erpCategories',
      type: 'relationship',
      relationTo: 'product-erp-category',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Category',
      name: 'Category',
      type: 'relationship',
      relationTo: 'product-category',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'manufacturer',
      type: 'relationship',
      relationTo: 'manufacturer',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'warehouse',
      type: 'relationship',
      relationTo: 'warehouses',
      hasMany: false,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}

export default Products
