import { Fragment } from "react"
import { NavBar } from "./components/NavBar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <Fragment>
      <NavBar />
      <div className="App bg-slate-300 dark:bg-slate-600 transition-colors duration-500">
        <Outlet />
      </div>
    </Fragment>
  )
}

export default App
