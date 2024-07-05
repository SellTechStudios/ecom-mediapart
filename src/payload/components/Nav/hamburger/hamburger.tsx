import React from 'react'
import { useTranslation } from 'react-i18next'
import Chevron from 'payload/components/icons'

const baseClass = 'hamburger'

export const Hamburger: React.FC<{
  closeIcon?: 'collapse' | 'x'
  isActive?: boolean
}> = props => {
  const { t } = useTranslation('general')
  const { closeIcon = 'x', isActive = false } = props

  return <h1>OK</h1>
}
