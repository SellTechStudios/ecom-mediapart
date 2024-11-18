import React from 'react'

interface RadioButtonProps {
  label: string
  value: string
  isSelected: boolean
  onRadioChange: (value: string) => void
  groupName: string
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  value,
  isSelected,
  onRadioChange,
  groupName,
}) => {
  const handleRadioChange = () => {
    onRadioChange(value)
  }

  return (
    <label className="flex items-center gap-2 whitespace-nowrap cursor-pointer">
      <input
        type="radio"
        checked={isSelected}
        onChange={handleRadioChange}
        className="appearance-none w-6 h-6 rounded-full bg-white border-2 border-gray-700 cursor-pointer 
                   checked:bg-white checked:relative checked:outline-none checked:border-gray-700"
        name={groupName}
      />
      <span className="relative block w-6 h-6">
        {isSelected && (
          <span className="absolute inset-1/2 w-3 h-3 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </span>
      {label}
    </label>
  )
}
