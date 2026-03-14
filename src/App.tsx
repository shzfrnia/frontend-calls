import { Outlet } from "react-router-dom"

import Layout from "./components/layout"
import "./App.css"
import { useApplicationServer } from "./services/app-server"

function App() {
  useApplicationServer()

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
