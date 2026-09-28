import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import { handleSuccess } from '../../utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {

  const [loggedInUser, setLoggedInUser] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser")
    if (user) {
      setLoggedInUser(user) 
    } else {
      navigate('/login') // protect route
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('token')
    handleSuccess('User Logged Out')

    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  return (
    <div className='home-container'>
      <div className='home-card'>
        <h1 className='home-title'>Welcome</h1>
        <h2 className='home-user'>{loggedInUser}</h2>

        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Home