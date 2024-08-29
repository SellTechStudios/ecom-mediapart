import { CartPage } from './CartPage'
import { Settings } from 'src/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Container } from '@/components/Container'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  let settings: Settings = await getCachedGlobal('settings')()

  return (
    <div>
      <Container>
        <h3>Cart</h3>
        <CartPage settings={settings} />
      </Container>
    </div>
  )
}
