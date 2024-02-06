'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
// import { type ThemeProviderProps } from "next-themes/dist/types"

const ThemeProvider = ({ children, ...props }) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default ThemeProvider
