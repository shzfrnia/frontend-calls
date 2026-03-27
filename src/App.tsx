import { Outlet } from "react-router-dom"

import { useApplicationServer } from "./api/app-server"
import { useApplicationDataQuery } from "./api/application-ws"

import { Spinner } from "@/components/ui/spinner"
import { Dialog, DialogOverlay } from "@/components/ui/dialog"

import Layout from "./components/layout"
import { ApplicationVersions } from "./components/application-versions"

import "./App.css"

function App() {
  useApplicationServer()
  const { data } = useApplicationDataQuery() // init ws

  if (!data || data.connectionState === "connecting") {
    return (
      <Dialog open={true}>
        <DialogOverlay>
          <div className="flex items-center justify-center h-full">
            <Spinner className="size-12" />
          </div>
        </DialogOverlay>

        <ApplicationVersions />
      </Dialog>
    )
  }

  // fetch("https://dummyjson.com/todos/random")
  //   .then((res) => res.json())
  //   .then((body) => console.log(body))

  return (
    <Layout>
      <Outlet />

      <ApplicationVersions />
    </Layout>
  )
}

export default App
