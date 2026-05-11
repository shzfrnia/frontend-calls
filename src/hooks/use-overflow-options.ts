import { MutableRefObject, useLayoutEffect, useRef, useMemo } from "react"
import { debounce, throttle } from "lodash"

export type Size = {
  width: number
  height: number
}

export type ResizeOptions = {
  mode?: 1 | 2
  debounce?: number
  throttle?: number
}

export function useResize<T extends HTMLElement = HTMLElement>(
  callback: (size: Size) => void,
  options: ResizeOptions = {}
): MutableRefObject<T | null> {
  const targetRef = useRef<T | null>(null)

  const callbackFn = useMemo(() => {
    const { mode = 2, debounce: debounceMs, throttle: throttleMs } = options

    if (debounceMs !== undefined) {
      return debounce((size: Size) => callback(size), debounceMs)
    }

    if (throttleMs !== undefined) {
      return throttle((size: Size) => callback(size), throttleMs)
    }

    if (mode === 1) {
      return debounce((size: Size) => callback(size), 200)
    }

    return throttle((size: Size) => callback(size), 120)
  }, [callback, options])

  useLayoutEffect(() => {
    const element = targetRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        callbackFn({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [callbackFn])

  return targetRef
}
