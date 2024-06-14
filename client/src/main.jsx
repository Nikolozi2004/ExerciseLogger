import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Home } from './pages/Home.jsx'
import { History } from './components/History.jsx'
import { ExerciseContextProvider } from './context/ExerciseContext.jsx'
import { AuthProvider } from './context/authContext.jsx'
import ProtectedRoute from './hooks/ProtectedRoute.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
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
    <AuthProvider>
      <ExerciseContextProvider>
        <RouterProvider router={router} />
      </ExerciseContextProvider>
    </AuthProvider>
  </React.StrictMode>
)