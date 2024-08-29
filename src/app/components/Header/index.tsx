import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Header } from '../../../payload-types'
import HeaderComponent from './ClientComponents/header-component'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()

  return <HeaderComponent header={header} />
}
