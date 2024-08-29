import { Metadata } from 'next'

import { LogoutPage } from './LogoutPage'

import classes from './index.module.scss'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Container } from '@/components/Container'

export default async function Logout() {
  return (
    <Container className={classes.logout}>
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
