import { Fragment } from "react"
import { NavBar } from "./components/NavBar"
import { Home } from "./pages/Home"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <Fragment>
      <NavBar />
      <div className="App">
        <Outlet />
      </div>
    </Fragment>
  )
}

export default App
