import { Outlet } from "react-router-dom"

import "./App.css"
import Layout from "./components/layout"
import { Spinner } from "./components/ui/spinner"
import { useApplicationServer } from "./api/app-server"
import { useApplicationDataQuery } from "./api/application-ws"

import { Dialog, DialogOverlay } from "@/components/ui/dialog"

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
      </Dialog>
    )
  }

  // fetch("https://dummyjson.com/todos/random")
  //   .then((res) => res.json())
  //   .then((body) => console.log(body))

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
