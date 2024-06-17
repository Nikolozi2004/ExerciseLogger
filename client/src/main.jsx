import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Home } from './pages/Home.jsx'
import { Account } from './pages/Account.jsx'
import { ExerciseContextProvider } from './context/ExerciseContext.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { ProtectedRoute } from './hooks/ProtectedRoute.jsx'
import { DarkModeProvider } from './context/DarkModeContext.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Unauthorized } from './pages/Unauthorized.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
    errorElement: <NotFound />
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "/account",
    element: <Account />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "*",
    element: <NotFound />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ExerciseContextProvider>
        <DarkModeProvider>
          <RouterProvider router={router} />
        </DarkModeProvider>
      </ExerciseContextProvider>
    </AuthProvider>
  </React.StrictMode>
)