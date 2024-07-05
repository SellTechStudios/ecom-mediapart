import type { Page } from '../payload-types'

export const home: Partial<Page> = {
  title: 'Home',
  slug: 'home',
  _status: 'published',
  meta: {
    title: 'Mediapart',
    description: '',
  },
  layout: [
    {
      blockName: 'Recent Products',
      blockType: 'productsSlider',
      ListType: 'Recent',
      ProductsCount: 5,
    },
    {
      blockName: 'Best Selling Products',
      blockType: 'productsSlider',
      ListType: 'Bestsellers',
      ProductsCount: 5,
    },
  ],
}
