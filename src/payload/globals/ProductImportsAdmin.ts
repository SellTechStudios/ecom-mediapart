import type { GlobalConfig } from 'payload/dist/globals/config/types'

import Wholesaler1Tab from '../components/Imports/Tabs'
import ImportsAdminView from '../components/Imports/imports'

export const ProductImportsAdmin: GlobalConfig = {
  slug: 'wholesaler-imports',
  versions: false,
  label: {
    en: 'Imports',
  },
  admin: {
    group: 'Product Imports',
    components: {
      elements: {},
      views: {
        Edit: {
          Default: ImportsAdminView,
          Wholesaler1: {
            path: '/wholesaler-1',
            Component: ImportsAdminView,
            Tab: Wholesaler1Tab,
          },
        },
      },
    },
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
