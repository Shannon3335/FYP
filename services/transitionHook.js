'use client'
import { useState, useEffect, useCallback } from 'react'

const useRandomTextWithStyle = (transitionDuration, ob) => {
  const keys = Object.keys(ob)

  const selectRandomText = useCallback(() => {
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    return {
      text: randomKey,
      style: ob[randomKey],
    }
  }, [keys, ob])

  const [selectedText, setSelectedText] = useState(selectRandomText())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedText(selectRandomText())
    }, transitionDuration)

    return () => clearInterval(intervalId)
  }, [selectRandomText, transitionDuration])

  return selectedText
}

// Usage:
// const transitionDuration = 3000;
// const { text, style } = useRandomTextWithStyle(transitionDuration);
export default useRandomTextWithStyle
