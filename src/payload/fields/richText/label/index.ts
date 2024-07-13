import type { RichTextCustomElement } from '@payloadcms/richtext-slate/dist/types'

import Button from './Button'
import Element from './Element'
import withLabel from './plugin'

const richTextLabel: RichTextCustomElement = {
  name: 'label',
  Button,
  Element,
  plugins: [withLabel as any],
}

export default richTextLabel
