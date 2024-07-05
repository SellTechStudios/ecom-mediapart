import React from 'react'

import { Media as MediaType } from '../../../payload/payload-types'
import { CMSLink, CMSLinkType } from '../../_components/Link'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

type CustomHeroBlock = {
  richText: { [k: string]: unknown }[]
  media?: string | MediaType
  links?: { link: CMSLinkType }[]
}

export const CustomHero: React.FC<CustomHeroBlock> = ({ richText, media, links }) => {
  const mediaUrl =
    media &&
    typeof media !== 'string' &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper} style={{ backgroundImage: `url(${mediaUrl})` }}>
        <div className={classes.heroTextBox}>
          <RichText content={richText} />

          {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
