import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  selectApplicationServerUrl,
  setApplicationServerUrl,
} from "@/store/slices/api-slice"
import { useAppSelector, useAppDispatch } from "@/hooks/use-store"

const LOGIN_PAGE_URL = "/login"

export function useApplicationServer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const url = useAppSelector(selectApplicationServerUrl)

  useEffect(() => {
    if (!url) {
      navigate(LOGIN_PAGE_URL)
    } else if (location.pathname === "/") {
      navigate("/home")
    }
  }, [location.pathname, navigate, url])

  return {
    setApplicationServerUrl: (url: string) => {
      dispatch(setApplicationServerUrl(url))
      if (!url) {
        navigate(LOGIN_PAGE_URL)
      }
    },
    applicationServerUrl: url,
  }
}
