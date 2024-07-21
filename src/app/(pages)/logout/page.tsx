import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Container } from '../../_components/Container'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { LogoutPage } from './LogoutPage'

import classes from './index.module.scss'

export default async function Logout() {
  const settings: Settings | null = await fetchSettings()

  return (
    <Container className={classes.logout}>
      <LogoutPage settings={settings} />
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
