import { CheckoutPage } from '@/components/CheckoutPage'

import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getMeUser } from '@/utilities/getMeUser'
import { Settings } from 'src/payload-types'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  let settings: Settings = await getCachedGlobal('settings')()

  return (
    <div className="w-full my-12 sm:mt-8">
      <Container>
        <CheckoutPage settings={settings} />
      </Container>
    </div>
  )
}
