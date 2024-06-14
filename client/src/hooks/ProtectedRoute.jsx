import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import { App } from '../App'


export const ProtectedRoute = () => {
    const { user } = AuthContext()
    return user ? <App /> : <Navigate to="/login" />
}
