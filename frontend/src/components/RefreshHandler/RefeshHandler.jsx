import { useEffect } from 'react'

const RefeshHandler = ({ setIsAuthenticated }) => {

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [setIsAuthenticated])

  return null
}

export default RefeshHandler