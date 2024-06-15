import { useAuthContext } from './useAuthContext'
import { Navigate } from 'react-router-dom'
import App from '../App'


export const ProtectedRoute = () => {
    const { user, isLoading } = useAuthContext()
    console.log('User in ProtectedRoute:', user)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Loading...</p>
                </div>
            </div>
        );
    }

    return user ? <App /> : <Navigate to="/login" />
}
