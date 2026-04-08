import { useEffect } from "react"

import {
  selectApplicationServerUrl,
  setApplicationServerUrl,
} from "@/store/slices/application-slice"

import { useAppSelector, useAppDispatch } from "@/hooks/use-store"

import { useGetServerInfoQuery } from "../system"

type ServerConnectionStatus = "checking" | "failed" | "success"

export function useApplicationServer() {
  const dispatch = useAppDispatch()
  const currentUrl = useAppSelector(selectApplicationServerUrl)
  const { isLoading, isSuccess, data, isUninitialized, refetch } =
    useGetServerInfoQuery()

  useEffect(() => {
    refetch()
  }, [currentUrl, refetch])

  const applicationServerStatus: ServerConnectionStatus =
    isUninitialized || isLoading
      ? "checking"
      : isSuccess && data && data.version
        ? "success"
        : "failed"

  return {
    setApplicationServerUrl: (url: string) => {
      dispatch(setApplicationServerUrl(url))
    },
    applicationServerUrl: currentUrl,
    applicationServerVersion: data?.version,
    applicationServerStatus,
  }
}
