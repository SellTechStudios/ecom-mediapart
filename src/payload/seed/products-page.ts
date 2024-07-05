import type { Page } from '../payload-types'

export const productsPage: Omit<Page, 'updatedAt' | 'createdAt' | 'id'> = {
  title: 'Products',
  slug: 'products',
  _status: 'published',
  layout: [
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      introContent: [
        {
          type: 'h4',
          children: [
            {
              text: 'All products',
            },
          ],
        },
        {
          type: 'p',
          children: [
            {
              text: 'The products below are displayed in an "Archive" layout building block which is an extremely powerful way to display docs on a page. It can be auto-populated by collection, filtered by category, and much more.',
            },
          ],
        },
      ],
      populateBy: 'collection',
      relationTo: 'products',
      limit: 10,
      categories: [],
    },
  ],
}
