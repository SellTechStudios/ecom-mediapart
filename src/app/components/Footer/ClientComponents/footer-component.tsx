'use client'

import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
  TagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '../../Container'
import { Footer } from 'src/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  // const pathname = usePathname()
  // const navItems = footer?.navItems || []

  return (
    <footer className="py-24 bg-gray-100 text-gray-800 text-opacity-75 font-light">
      <Container className="flex flex-col gap-24 ">
        {/* delivery info */}
        <div className="flex flex-row justify-center gap-40">
          <div className="flex flex-col items-center prose">
            <TruckIcon className="size-16" />
            <h3 className="text-gray-900">Darmowa Dostawa</h3>
            <div>dla zamówień powyżej 200 zł</div>
          </div>

          <div className="flex flex-col items-center prose ">
            <TagIcon className="size-16" />
            <h3 className="text-gray-900">Tanie Dostawy</h3>
            <div>Orlen Paczka: 8.50 zł</div>
            <div>Paczkomaty InPost: 13.00 zł</div>
          </div>
        </div>

        {/* footer */}
        <nav className="container flex flex-row items-start justify-between mx-auto align-top">
          {/* contact info */}
          <div className="flex flex-col gap-6  text-sm">
            <Image src="/mediapart_logo.png" width={140} height={60} alt="Mediapart Logo" />
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
              <a href="tel: 888305405" className="hover:text-orange-700">
                888 305 405
              </a>
            </div>
            <div className="flex flex-row items-center gap-2">
              <EnvelopeIcon className="size-4" />
              <a href="mailto:sklep@mediapart.pl" className="hover:text-orange-700">
                sklep@mediapart.pl
              </a>
            </div>
          </div>

          <nav className="flex flex-col prose">
            <h4 className="mb-4 text-gray-900">Informacje</h4>
            <div className="flex flex-col text-sm gap-4">
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Polityka Prywatności
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Regulamin
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Dostawy
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Płatności
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Zwroty i reklamacje
              </Link>
              <Link className="no-underline font-light hover:text-orange-700" href="#">
                Odstąpienie od umowy
              </Link>
            </div>
          </nav>

          <nav className="flex flex-col prose">
            <h4 className="mb-4 text-gray-900">Przydatne Linki</h4>
            <div className="flex flex-col text-sm gap-4">
              <div className="flex flex-row items-center gap-2">
                <PhoneIcon className="size-4" />
                <a
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.facebook.com/profile.php?id=100083258796384"
                  target="_blank"
                >
                  Facebook
                </a>
              </div>
              <div className="flex flex-row items-center gap-2">
                <PhoneIcon className="size-4" />
                <a
                  className="no-underline font-light hover:text-orange-700"
                  href="https://allegro.pl/uzytkownik/mediapart"
                  target="_blank"
                >
                  Allegro
                </a>
              </div>
              <div className="flex flex-row items-center gap-2">
                <PhoneIcon className="size-4" />
                <a
                  className="no-underline font-light hover:text-orange-700"
                  href="https://www.ceneo.pl/sklepy/MEDIAPART-s10157"
                  target="_blank"
                >
                  Ceneo
                </a>
              </div>
            </div>
          </nav>

          {/* theme */}
          <div className="flex flex-col prose">
            <ThemeSelector />
          </div>
        </nav>
      </Container>
    </footer>
  )
}

export default FooterComponent
