import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { AuthProvider } from './Auth'
import { CartProvider } from './Cart'
import { FilterProvider } from './Filter'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FilterProvider>
          <HeaderThemeProvider>
            <CartProvider>{children}</CartProvider>
          </HeaderThemeProvider>
        </FilterProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
