'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Header } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { UserIcon } from '@heroicons/react/24/outline'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()
  const { user } = useAuth()
  const navItems = header?.navItems || []

  return (
    <header className="container mx-auto flex flex-row items-center justify-between py-4">
      <Link href="/">
        <Image src="/mediapart_logo.png" alt="Mediapart Logo" width={200} height={100} />
      </Link>

      <nav className="flex flex-row gap-4 uppercase">
        <Link href="/products/new">Nowości</Link>
        <Link href="/products/promoted">Promocje</Link>
        <Link href="/products/outlet">Outlet</Link>
      </nav>

      <div className="flex flex-row gap-6">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="none" />
        })}
        <CartLink />
        {user && (
          <Link href="/account">
            <UserIcon className="size-5" />
          </Link>
        )}
        {!user && (
          <Link href="/login" onClick={() => (window.location.href = '/login')}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default HeaderComponent
