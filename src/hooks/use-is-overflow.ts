import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from "react"

import { useResize } from "./use-resize"

export function useIsOverflow<T extends HTMLElement = HTMLElement>(): [
  ref: MutableRefObject<T | null>,
  boolean,
] {
  const ref = useRef<T | null>(null)

  const checkSize = useCallback(() => {
    const element = ref.current
    if (!element) {
      return false
    }

    return (
      element.scrollWidth > element.clientWidth ||
      element.scrollHeight > element.clientHeight
    )
  }, [ref])

  const [isOverflow, setIsOverflow] = useState(false)

  useResize(() => setIsOverflow(checkSize()), { ref, throttle: 200 })

  useLayoutEffect(() => {
    setIsOverflow(checkSize())
  }, [checkSize])

  return [ref, isOverflow]
}
