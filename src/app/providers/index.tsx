import React from 'react'

import { AuthProvider } from './Auth'
import { CartProvider } from './Cart'
import { FilterProvider } from './Filter'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <FilterProvider>
        <CartProvider>{children}</CartProvider>
      </FilterProvider>
    </AuthProvider>
  )
}
