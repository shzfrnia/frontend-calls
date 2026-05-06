import { MutableRefObject, useLayoutEffect, useRef, useMemo } from "react"
import { debounce, throttle } from "lodash"

export type Size = {
  width: number
  height: number
}

export function useResize<T extends HTMLElement = HTMLElement>(
  callback: (size: Size) => void,
  options: {
    ref?: MutableRefObject<T | null>
    debounce?: number
    throttle?: number
  } = {}
): MutableRefObject<T | null> {
  const internalRef = useRef<T | null>(null)

  const target = options.ref || internalRef

  const savedCallback = useRef(callback)

  useLayoutEffect(() => {
    savedCallback.current = callback
  })

  const { debounce: debounceMs, throttle: throttleMs } = options

  const throttledCallback = useMemo(() => {
    const fn = (size: Size) => savedCallback.current(size)

    if (debounceMs !== undefined) return debounce(fn, debounceMs)
    if (throttleMs !== undefined) return throttle(fn, throttleMs)

    return fn
  }, [debounceMs, throttleMs])

  useLayoutEffect(() => {
    const element = target.current

    console.log(target)

    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        throttledCallback({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      })
    })
    resizeObserver.observe(element)

    return () => {
      resizeObserver?.disconnect()
    }
  }, [throttledCallback])

  return target
}
