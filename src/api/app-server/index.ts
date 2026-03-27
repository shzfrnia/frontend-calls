import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  selectApplicationServerUrl,
  setApplicationServerUrl,
} from "@/store/slices/application-slice"

import { useAppSelector, useAppDispatch } from "@/hooks/use-store"

import { useGetServerInfoQuery } from "../system"

const LOGIN_PAGE_URL = "/login"

type ServerConnectionStatus = "checking" | "failed" | "success"

export function useApplicationServer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const location = useLocation()
  const currentUrl = useAppSelector(selectApplicationServerUrl)
  const { isLoading, isSuccess, data, isUninitialized } =
    useGetServerInfoQuery()

  // useEffect(() => {
  //   if (!url) {
  //     navigate(LOGIN_PAGE_URL)
  //   } else if (location.pathname === "/") {
  //     navigate("/home")
  //   }
  // }, [location.pathname, navigate, url])

  const applicationServerStatus: ServerConnectionStatus =
    isUninitialized || isLoading
      ? "checking"
      : isSuccess && data && data.version
        ? "success"
        : "failed"

  return {
    setApplicationServerUrl: (url: string) => {
      dispatch(setApplicationServerUrl(url))
      if (url) {
        navigate(LOGIN_PAGE_URL)
      }
    },
    applicationServerUrl: currentUrl,
    applicationServerVersion: data?.version,
    applicationServerStatus,
  }
}
