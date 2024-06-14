import { useAuthContext } from './useAuthContext'
import { Navigate } from 'react-router-dom'
import App from '../App'


export const ProtectedRoute = () => {
    const { user } = useAuthContext()
    console.log('User in ProtectedRoute:', user)
    return user ? <App /> : <Navigate to="/login" />
}
