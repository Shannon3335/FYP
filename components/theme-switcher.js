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
    <div>
      <Switch
        defaultSelected
        size='lg'
        color='secondary'
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={className} />
          ) : (
            <MoonIcon className={className} />
          )
        }
        onValueChange={(isSelected)=> {isSelected?setTheme('light'):setTheme('dark')}}>
        {({isSelected}) => {
          isSelected ? 'Light' : 'Dark'
        }}
      </Switch>
      {/* The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button> */}
    </div>
  )
}

export default ThemeSwitcher
