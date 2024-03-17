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
// const transitionDuration = 3000
// const { text, style } = useRandomTextWithStyle(transitionDuration)

const useTextFromArray = (transitionDuration, objectsArray) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const selectObjectAtIndex = useCallback(() => {
    return { selectedObject: objectsArray[currentIndex], currentIndex }
  }, [objectsArray, currentIndex])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === objectsArray.length - 1 ? 0 : prevIndex + 1))
    }, transitionDuration)
    return () => clearInterval(intervalId)
  }, [transitionDuration, objectsArray.length])

  return selectObjectAtIndex()
}

export { useRandomTextWithStyle, useTextFromArray }
