import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Image from 'next/image'
import type { DocumentTabComponent } from 'payload/dist/admin/components/elements/DocumentHeader/Tabs/types'

import './index.scss'

const Wholesaler1Tab: DocumentTabComponent = props => {
  const { path } = props
  const match = useRouteMatch()

  return (
    <Link className="fd-dist-tab" to={`${match.url}${path}`}>
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
