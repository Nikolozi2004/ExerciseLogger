import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'

export const useDeleteUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user, dispatch } = useAuthContext()

  useEffect(() => {
    console.log('User context:', user)
  }, [user])

  const deleteUser = async () => {
    setIsLoading(true)
    setError(null)

    // if (!user || !user._id) {
    //   setError('User information is missing. You must be logged in to delete your account.')
    //   setIsLoading(false)
    //   return
    // }

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
