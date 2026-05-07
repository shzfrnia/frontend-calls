import {
  MutableRefObject,
  useCallback,
  useLayoutEffect,
  useState,
  useRef,
} from "react"

import { useResize } from "./use-resize"

export function useIsOverflow<T extends HTMLElement = HTMLElement>({
  enabled = true,
}: {
  enabled?: boolean
} = {}): [ref: MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)

  const checkSize = useCallback(() => {
    const element = ref.current

    if (!element || !enabled) {
      return false
    }

    return (
      element.scrollWidth > element.clientWidth ||
      element.scrollHeight > element.clientHeight
    )
  }, [enabled])

  const [isOverflow, setIsOverflow] = useState(false)

  useResize(() => setIsOverflow(checkSize()), {
    ref,
    debounce: 300,
    enabled,
  })

  useLayoutEffect(() => {
    setIsOverflow(checkSize())
  }, [checkSize])

  return [ref, isOverflow]
}
