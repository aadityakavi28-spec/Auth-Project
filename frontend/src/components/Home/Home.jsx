import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { handleSuccess } from '../../utils'

const Home = ({ setIsAuthenticated }) => {

  const [loggedInUser, setLoggedInUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser")
    const token = localStorage.getItem("token")

    if (user && token) {
      setLoggedInUser(user)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')

    handleSuccess('User Logged Out')

    setIsAuthenticated(false)

    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className='home-container'>
      <div className='home-card'>
        <h1 className='home-title'>Welcome</h1>
        <h2 className='home-user'>{loggedInUser}</h2>

        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Home