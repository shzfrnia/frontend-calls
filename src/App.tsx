import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { usePageTitle } from "./hooks/use-page-title"
import { useAppSelector } from "./hooks/use-store"

import { useApplicationServer } from "./api/app-server"
import { useApplicationDataQuery } from "./api/application-ws"

import { selectSettingsDialog } from "./store/slices/settings-slice"
import { selectToken } from "./store/slices/auth-slice"

import Layout from "./components/layout"
import { useLazyMeQuery } from "./api/users"
import { ApplicationVersions } from "./components/application-versions"
import { EmptyServerFailed } from "./components/empty-server-failed"
import { ApplicationLoading } from "./components/application-loading"
import { SettingsDialog } from "./components/dialogs/settings-dialog"

import "./App.css"

function App() {
  const navigate = useNavigate()
  usePageTitle("Цитатник")
  const { applicationServerStatus } = useApplicationServer()
  const [me] = useLazyMeQuery()
  const { opened } = useAppSelector(selectSettingsDialog)
  const token = useAppSelector(selectToken)

  const { data } = useApplicationDataQuery() // init ws

  useEffect(() => {
    if (applicationServerStatus === "success" && token) {
      me()
    }
  }, [applicationServerStatus, me, token])

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  // if (!data || data.connectionState === "connecting") {
  //   return <ApplicationLoading />
  // }

  if (!data || applicationServerStatus === "checking") {
    return <ApplicationLoading />
  }

  if (applicationServerStatus === "failed") {
    return <EmptyServerFailed />
  }

  return (
    <Layout>
      <Outlet />

      <ApplicationVersions />
      <SettingsDialog open={opened} />
    </Layout>
  )
}

export default App
