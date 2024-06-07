import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Home } from './pages/Home.jsx'
import { History } from './components/History.jsx'
import { ExerciseContextProvider } from './context/ExerciseContext.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/history",
        element: <History />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExerciseContextProvider>
    <RouterProvider router={router} />
    </ExerciseContextProvider>
  </React.StrictMode>
)
