import { CartPage } from '@/components/CartPage'
import { Container } from '@/components/Container'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { Settings } from 'src/payload-types'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  let settings: Settings = await getCachedGlobal('settings')()

  return (
    <div>
      <Container>
        <h3>Koszyk</h3>
        <CartPage settings={settings} />
      </Container>
    </div>
  )
}
