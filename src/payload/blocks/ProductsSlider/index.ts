import type { Block } from 'payload/types'

export const ProductsSlider: Block = {
  slug: 'productsSlider',
  labels: {
    singular: 'Products Slider',
    plural: 'Products Sliders',
  },
  fields: [
    {
      name: 'ProductsCount',
      type: 'number',
      label: 'Products Count',
    },
    {
      name: 'ListType',
      type: 'select',
      label: 'List Type',
      defaultValue: 'Recent',
      options: [
        {
          label: 'Bestsellers',
          value: 'Bestsellers',
        },
        {
          label: 'Recently Added',
          value: 'Recent',
        },
      ],
    },
  ],
}
