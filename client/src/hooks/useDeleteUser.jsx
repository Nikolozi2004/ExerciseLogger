import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
export const useDeleteUser = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { user, dispatch } = useAuthContext()
  const navigate = useNavigate()
  useEffect(() => {
    console.log('User context:', user)
  }, [user])

  const deleteUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await axios.delete(`http://localhost:4000/api/user/${user._id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      localStorage.removeItem('user')
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { deleteUser, isLoading, error }
}
