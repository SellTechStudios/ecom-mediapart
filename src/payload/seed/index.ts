import type { Payload } from 'payload'
import { home } from './home'
import { cartPage } from './cart-page'
import { productsPage } from './products-page'

const collections = ['pages']
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections`)
  await payload.delete({
    collection: 'pages',
    where: {},
  })

  payload.logger.info(`— Seeding home page...`)
  await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(home)),
  })

  payload.logger.info(`— Seeding products page...`)
  const productsPageDoc = await payload.create({
    collection: 'pages',
    data: productsPage,
  })

  let productsPageID = productsPageDoc.id
  if (payload.db.defaultIDType === 'text') {
    productsPageID = `"${productsPageID}"`
  }

  payload.logger.info(`— Seeding cart page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(cartPage).replace(/"\{\{PRODUCTS_PAGE_ID\}\}"/g, productsPageID),
    ),
  })

  payload.logger.info('Seeded database successfully!')
}
