import { GlobalConfig } from 'payload'

// const FdDistributionPath = '/fd-distribution'

export const ProductImportsAdmin: GlobalConfig = {
  slug: 'wholesaler-imports',
  versions: false,
  label: {
    en: 'Imports',
  },
  admin: {
    group: 'Product Imports',
    components: {
      views: {
        edit: {
          root: {
            Component: '/payload/globals/ProductsImport/ImportsDefaultUI',
          },
          // FDDistributionTab: {
          //   Component: '/payload/globals/ProductsImport/Tabs/imports',
          //   path: FdDistributionPath,
          //   tab: {
          //     label: 'FD Distribution',
          //     href: FdDistributionPath,
          //   },
          // },
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
