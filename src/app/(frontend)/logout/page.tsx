import { Metadata } from 'next'

import { LogoutPage } from './LogoutPage'

import { Container } from '@/components/Container'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export default async function Logout() {
  return (
    <Container className="mb-24 lg:mb-24 md:mb-15">
      <LogoutPage />
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Logout',
  description: 'You have been logged out.',
  openGraph: mergeOpenGraph({
    title: 'Logout',
    url: '/logout',
  }),
}
