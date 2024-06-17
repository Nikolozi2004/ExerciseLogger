import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">401</h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Unauthorized Access</h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Oops! It looks like you don't have permission to access this page.
        </p>
        <div className="space-x-4">
          <Link 
            to="/login" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};