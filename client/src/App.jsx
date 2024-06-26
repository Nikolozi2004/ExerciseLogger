import { Fragment } from "react"
import { NavBar } from "./components/NavBar"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <Fragment>
      <NavBar />
      <div className="App bg-slate-300 p-0 py-2 pr-2 md:p-5 dark:bg-slate-600 transition-colors duration-500 animate-fadeIn">
        <Outlet />
      </div>
    </Fragment>
  )
}

export default App
