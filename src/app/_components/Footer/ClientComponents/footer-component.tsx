'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Footer } from '../../../../payload/payload-types'
import {
  TruckIcon,
  TagIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  // const pathname = usePathname()
  // const navItems = footer?.navItems || []

  return (
    <footer className="flex flex-col gap-24 bg-gray-100 px-12 py-24">
      {/* delivery info */}
      <div className="flex flex-row justify-center gap-40">
        <div className="prose flex flex-col items-center">
          <TruckIcon className="mb-4 size-16" />
          <h4>Darmowa Dostawa</h4>
          <h4>dla zamówień powyżej</h4>
          <h4>200 zł</h4>
        </div>

        <div className="prose flex flex-col items-center">
          <TagIcon className="mb-4 size-16" />
          <h4>Tanie Dostawy</h4>
          <h4>Orlen Paczka: 8.50 zł</h4>
          <h4>Paczkomaty InPost: 13.00 zł</h4>
        </div>
      </div>

      {/* footer */}
      <nav className="container mx-auto flex flex-row items-start justify-between align-top">
        {/* contact info */}
        <div className="flex flex-col gap-6">
          <Image src="/mediapart_logo.png" width={200} height={100} alt="Mediapart Logo" />
          <div className="flex flex-row items-center gap-2">
            <MapPinIcon className="size-4" />
            <span>
              Do Studzienki 16
              <br />
              80-227 Gdańsk
            </span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <PhoneIcon className="size-4" />
            <a href="tel: 888305405">888 305 405</a>
          </div>
          <div className="flex flex-row items-center gap-2">
            <EnvelopeIcon className="size-4" />
            <a href="mailto:sklep@mediapart.pl">sklep@mediapart.pl</a>
          </div>
        </div>

        <nav className="prose flex flex-col">
          <h2 className="mb-4">Informacje</h2>
          <div className="flex flex-col">
            <Link className="no-underline" href="#">
              Polityka Prywatności
            </Link>
            <Link className="no-underline" href="#">
              Regulamin
            </Link>
            <Link className="no-underline" href="#">
              Dostawy
            </Link>
            <Link className="no-underline" href="#">
              Płatności
            </Link>
            <Link className="no-underline" href="#">
              Zwroty i reklamacje
            </Link>
            <Link className="no-underline" href="#">
              Odstąpienie od umowy
            </Link>
          </div>
        </nav>

        <nav className="prose flex flex-col">
          <h2 className="mb-4">Przydatne Linki</h2>
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4" />
              <a
                className="no-underline"
                href="https://www.facebook.com/profile.php?id=100083258796384"
                target="_blank"
              >
                Facebook
              </a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4" />
              <a
                className="no-underline"
                href="https://allegro.pl/uzytkownik/mediapart"
                target="_blank"
              >
                Allegro
              </a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <PhoneIcon className="size-4" />
              <a
                className="no-underline"
                href="https://www.ceneo.pl/sklepy/MEDIAPART-s10157"
                target="_blank"
              >
                Ceneo
              </a>
            </div>
          </div>
        </nav>

        {/* newsletter */}
        <div className="prose flex flex-col">
          <h2>Newsletter</h2>
        </div>
      </nav>
    </footer>
  )
}

export default FooterComponent
