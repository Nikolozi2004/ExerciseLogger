import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-9xl font-bold text-red-500 dark:text-red-400">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 mt-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-4 mb-8">
          
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}