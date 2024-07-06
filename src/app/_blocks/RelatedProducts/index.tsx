import React from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Container } from '../../_components/Container'

import classes from './index.module.scss'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { docs, relationTo } = props

  return (
    <div className={classes.relatedProducts}>
      <Container>
        <h3 className={classes.title}>Related Products</h3>
        <div className={classes.grid}>
          {docs?.map(doc => {
            if (typeof doc === 'string') return null

            return <Card key={doc.id} relationTo={relationTo} doc={doc} showCategories />
          })}
        </div>
      </Container>
    </div>
  )
}
