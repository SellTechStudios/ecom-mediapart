import React, { Fragment } from 'react'

import type { Page } from '../../../payload-types'

import { ProductsSliderBlock } from '@/blocks/ProductsSliderBlock'
import { ContentBlock } from '../../blocks/Content'
import { FormBlock } from '../../blocks/Form'
import { MediaBlock } from '../../blocks/MediaBlock'
import { toKebabCase } from '../../utilities/toKebabCase'

const blockComponents = {
  content: ContentBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  productsSlider: ProductsSliderBlock,
}

export const Blocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error */}
                  <Block id={toKebabCase(blockName)} {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
