// app/components/ThemeSwitcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@nextui-org/react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <Switch
      defaultSelected={theme === 'light'}
      size='sm'
      color='primary'
      thumbIcon={({ isSelected, className }) =>
        isSelected ? <SunIcon className={className} /> : <MoonIcon className={className} />
      }
      onValueChange={(isSelected) => {
        isSelected ? setTheme('light') : setTheme('dark')
      }}></Switch>
  )
}

export default ThemeSwitcher
