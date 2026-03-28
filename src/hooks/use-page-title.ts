import { useEffect } from "react"

export function usePageTitle(title?: string) {
  useEffect(() => {
    if (title) {
      document.title = title
    }
  }, [title])

  return {
    setTitle: (title: string) => {
      document.title = title
    },
  }
}
