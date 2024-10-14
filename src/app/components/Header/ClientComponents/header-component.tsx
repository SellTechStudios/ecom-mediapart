'use client'

import { CartLink } from '@/components/CartLink'
import { Container } from '@/components/Container'
import { useAuth } from '@/providers/Auth'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { UserIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Header } from 'src/payload-types'
import { CMSLink } from '../../Link'

const HeaderComponent = ({ header }: { header: Header }) => {
  const { user, status } = useAuth()
  const navItems = header?.navItems || []
  const [theme, setTheme] = useState(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header className="py-4" {...(theme ? { 'data-theme': theme } : {})}>
      <Container className="flex flex-row items-center justify-between">
        <Link href="/">
          <Image src="/mediapart_logo.png" alt="Mediapart Logo" width={200} height={100} priority />
        </Link>

        <nav className="flex flex-row gap-4 uppercase">
          <Link href="/products/new">Nowości</Link>
          <Link href="/products/promoted">Promocje</Link>
          <Link href="/products/outlet">Outlet</Link>
        </nav>

        <div className="flex flex-row gap-6">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="default" />
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
      </Container>
    </header>
  )
}

export default HeaderComponent
