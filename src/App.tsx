import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { usePageTitle } from "./hooks/use-page-title"
import { useAppSelector } from "./hooks/use-store"

import { useApplicationServer } from "./api/app-server"
import { useLazyMeQuery } from "./api/users"
import { useInitWsQuery } from "./api/ws"

import { selectSettingsDialog } from "./store/slices/settings-slice"
import { selectToken } from "./store/slices/auth-slice"

import { Layout } from "./components/layout"
import { ApplicationVersions } from "./components/application-versions"
import { EmptyServerFailed } from "./components/empty-server-failed"
import { ApplicationLoading } from "./components/application-loading"
import { SettingsDialog } from "./components/dialogs/settings-dialog"
import { LeaveServerDialog } from "./components/dialogs/leave-server-dialog"
import { ChangeCallDialog } from "./components/dialogs/change-call-dialog"
import { InviteToServer } from "./components/dialogs/invite-to-server"

import "./App.css"

function App() {
  usePageTitle("Цитатник")

  const navigate = useNavigate()

  const { data } = useInitWsQuery()
  const { applicationServerStatus } = useApplicationServer()
  const [me] = useLazyMeQuery()

  const { opened } = useAppSelector(selectSettingsDialog)
  const token = useAppSelector(selectToken)

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

      <SettingsDialog open={opened} />
      <LeaveServerDialog />
      <ChangeCallDialog />
      <InviteToServer />

      <ApplicationVersions />
    </Layout>
  )
}

export default App
