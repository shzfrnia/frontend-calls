import { Outlet } from "react-router-dom"

import { usePageTitle } from "./hooks/use-page-title"

import { useApplicationServer } from "./api/app-server"
import { useApplicationDataQuery } from "./api/application-ws"

import Layout from "./components/layout"
import { ApplicationVersions } from "./components/application-versions"
import { EmptyServerFailed } from "./components/empty-server-failed"
import { ApplicationLoading } from "./components/application-loading"

import "./App.css"

function App() {
  usePageTitle("Цитатник")
  const { applicationServerStatus } = useApplicationServer()
  const { data } = useApplicationDataQuery() // init ws

  if (!data || data.connectionState === "connecting") {
    return <ApplicationLoading />
  }

  if (applicationServerStatus === "failed") {
    return <EmptyServerFailed />
  }

  return (
    <Layout>
      <Outlet />

      <ApplicationVersions />
    </Layout>
  )
}

export default App
