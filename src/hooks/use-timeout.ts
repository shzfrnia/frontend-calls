import { useEffect, useRef } from "react"

export function useTimeout(
  callback: () => void,
  delay: number,
  condition: boolean
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (condition) {
      const id = setTimeout(() => savedCallback.current(), delay)

      return () => clearTimeout(id)
    }
  }, [delay, condition])
}
