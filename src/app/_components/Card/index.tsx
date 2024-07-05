'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { Media } from '../Media'

import classes from './index.module.scss'

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories } = {},
    className,
  } = props

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const href = `/products/${slug}`
  return (
    <Link href={href} className={[classes.card, className].filter(Boolean).join(' ')}>
      <div className={classes.mediaWrapper}>
        <Media imgClassName={classes.image} resource={doc.mediaImages?.[0].url} fill />
      </div>

      <div className={classes.content}>
        {titleToUse && <h4 className={classes.title}>{titleToUse}</h4>}
        <div className={classes.body}>{doc.description}</div>
      </div>
    </Link>
  )
}
