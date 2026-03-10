import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set up debounce timer
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Clean up timer on value change or component unmount
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
} 