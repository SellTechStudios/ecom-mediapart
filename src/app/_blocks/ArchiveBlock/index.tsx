import React from 'react'

import { CollectionArchive } from '../../_components/CollectionArchive'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'
import { cn } from '../../_utilities/cn'
import { ArchiveBlockProps } from './types'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    categories,
  } = props

  return (
    <div id={cn(id && `block-${id}`)} className="relative">
      {introContent && (
        <Gutter className="mb-12 md:mb-12">
          <RichText content={introContent} />
        </Gutter>
      )}
      <Gutter>
        <CollectionArchive
          populateBy={populateBy}
          relationTo={relationTo}
          populatedDocs={populatedDocs}
          populatedDocsTotal={populatedDocsTotal}
          categories={categories}
          limit={limit}
        />
      </Gutter>
    </div>
  )
}
