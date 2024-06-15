import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useDeleteUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const deleteUser = async (user) => {
    setIsLoading(true)
    setError(null)

    try {
      await axios.delete(`http://localhost:4000/api/user/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      // remove user from storage
      localStorage.removeItem('user')
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteUser, isLoading, error }
}
