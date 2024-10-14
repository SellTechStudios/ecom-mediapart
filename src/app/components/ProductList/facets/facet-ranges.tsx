'use client'
import { SelectValue } from '@/components/ui/select'
import { ChangeEvent, useEffect, useState } from 'react'

type FacetProps = {
  groupName: string
  groupValues: any[]
  onChange: (e: FacetRange[]) => void
}

export type FacetRange = {
  id: string
  lowerBound: number
  upperBound: number
}

export default function FacetRanges(props: FacetProps) {
  const { groupName, groupValues, onChange } = props
  const [selectedRanges, setSelectedRanges] = useState<FacetRange[]>([])

  //track local state
  const onCheckChange = (
    e: ChangeEvent<HTMLInputElement>,
    lowerBound: number,
    upperBound: number,
  ) => {
    const { value, checked } = e.target

    if (checked) {
      setSelectedRanges((prevSelectedValues) => [
        ...prevSelectedValues,
        {
          id: value,
          lowerBound,
          upperBound,
        },
      ])
    } else {
      setSelectedRanges((prevSelectedValues) => prevSelectedValues.filter((v) => v.id !== value))
    }
  }

  //notify parent about change
  useEffect(() => {
    onChange(selectedRanges)
  }, [selectedRanges])

  return (
    <div>
      <h3>{groupName}</h3>
      <ul>
        {groupValues &&
          groupValues.map((facet, _i) => (
            <li key={_i}>
              <label>
                <input
                  type="checkbox"
                  value={facet._id}
                  onChange={(e) => onCheckChange(e, facet.lowerBound, facet.upperBound)}
                />
                {facet.lowerBound} - {facet.upperBound} ({facet.count})
              </label>
            </li>
          ))}
      </ul>
    </div>
  )
}
