import * as React from 'react'
import { Select, useFormFields } from 'payload/components/forms'
import { TextField } from 'payload/dist/fields/config/types'

export const ProductSelect: React.FC<TextField> = props => {
  const { label } = props
  const [options, setOptions] = React.useState<
    {
      label: string
      value: string
    }[]
  >([])

  return (
    <div>
      <p style={{ marginBottom: '0' }}>{typeof label === 'string' ? label : 'Product'}</p>
      <p
        style={{
          marginBottom: '0.75rem',
          color: 'var(--theme-elevation-400)',
        }}
      ></p>
      <Select {...props} label="" options={options} />
    </div>
  )
}
