import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import './Login.css'
import { handleError, handleSuccess } from '../../utils'

const Login = ({ setIsAuthenticated }) => {

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target

    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { email, password } = loginInfo

    if (!email || !password) {
      return handleError('Fill all required fields')
    }

    try {
      const response = await fetch('https://auth-project-yiln.onrender.com/api/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      })

      const result = await response.json()
      console.log("LOGIN RESPONSE:", result)

      const { success, message, user, jwtToken } = result

      if (success) {
        localStorage.setItem('token', jwtToken || 'logged')
        localStorage.setItem('loggedInUser', user?.username)

        setIsAuthenticated(true)

        handleSuccess(message)

        setTimeout(() => {
          navigate('/home')
        }, 1500)

      } else {
        handleError(message)
      }

    } catch (error) {
      handleError(error.message || 'SERVER ERROR')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-card'>
        <h1 className='login-title'>Login</h1>

        <form onSubmit={handleSubmit} className='login-form'>

          <div className='login-group'>
            <label>Email</label>
            <input
              type="email"
              name='email'
              className='login-input'
              placeholder='Enter your email'
              value={loginInfo.email}
              onChange={handleChange}
            />
          </div>

          <div className='login-group'>
            <label>Password</label>
            <input
              type="password"
              name='password'
              className='login-input'
              placeholder='Enter your password'
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className='login-btn'>Login</button>

          <p className='login-text'>
            Don't have an account?
            <Link to='/signup' className='login-link'> Signup</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
