import React from 'react';
import Image from 'next/image';
import type { DocumentTabComponent } from 'payload/dist/admin/components/elements/DocumentHeader/Tabs/types'
import { Link, useLocation } from 'react-router-dom'

import './index.scss'

const Wholesaler1Tab: DocumentTabComponent = props => {
  const { path } = props
  const location = useLocation()

  return (
    <Link className="fd-dist-tab" to={`${location.pathname}${path}`}>
      <Image
        className="image"
        src="/admin ui/fd-distribution-logo.svg"
        width={30}
        height={30}
        alt="FD Distribution Logo"
      />
      FD Distribution
    </Link>
  )
}

export default Wholesaler1Tab
