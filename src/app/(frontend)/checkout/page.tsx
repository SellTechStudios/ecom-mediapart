import { CheckoutPage } from './CheckoutPage'

import classes from './index.module.scss'
import { Container } from '@/components/Container'
import { Settings } from 'src/payload-types'
import { getMeUser } from '@/utilities/getMeUser'
import { getCachedGlobal } from '@/utilities/getGlobals'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  let settings: Settings = await getCachedGlobal('settings')()

  return (
    <div className={classes.checkout}>
      <Container>
        <CheckoutPage settings={settings} />
      </Container>
    </div>
  )
}
