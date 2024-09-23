'use client'
import { ChangeEvent, useEffect, useState } from 'react'

type FacetProps = {
  groupName: string
  groupValues: any[]
  onChange: (e: string[]) => void
}

export default function FacetCheckbox(props: FacetProps) {
  const { groupName, groupValues, onChange } = props
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  //track local state
  const onCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    if (checked) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value])
    } else {
      setSelectedValues((prevSelectedValues) => prevSelectedValues.filter((v) => v !== value))
    }
  }

  //notify parent about change
  useEffect(() => {
    onChange(selectedValues)
  }, [selectedValues])

  return (
    <div>
      <h3>{groupName}</h3>
      <ul>
        {groupValues &&
          groupValues.map((facet, _i) => (
            <li key={_i}>
              <label>
                <input type="checkbox" value={facet.id} onChange={onCheckChange} />
                {facet.name} ({facet.count})
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}
