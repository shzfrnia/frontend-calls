import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const APP_SERVER_URL_KEY = "application-server-url"

export function setApplicationServerUrl(url: string) {
  localStorage.setItem(APP_SERVER_URL_KEY, url)
}

export function getApplicationServerUrl(): string {
  return localStorage.getItem(APP_SERVER_URL_KEY) || ""
}

const START_PAGE_URL = "/start-page"

export function useApplicationServer() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const url = getApplicationServerUrl()
    if (!url) {
      navigate(START_PAGE_URL)
    } else if (location.pathname === "/") {
      navigate("/home")
    }
  }, [location.pathname, navigate])

  return {
    setApplicationServerUrl: (url: string) => {
      setApplicationServerUrl(url)
      if (!url) {
        navigate(START_PAGE_URL)
      }
    },
    getApplicationServerUrl,
  }
}
