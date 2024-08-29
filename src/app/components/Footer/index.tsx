import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import type { Footer } from '../../../payload-types'
import FooterComponent from './ClientComponents/footer-component'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer')()

  // const navItems = footer?.navItems || []

  // {navItems.map(({ link }, i) => {
  //   return <CMSLink className="text-white" key={i} {...link} />
  // })}

  return <FooterComponent footer={footer} />
}
