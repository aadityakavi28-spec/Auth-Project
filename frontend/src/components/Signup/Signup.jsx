import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Signup.css'
import { handleError, handleSuccess } from '../../utils'

const Signup = () => {

  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setSignupInfo({
      ...signupInfo,
      [name]: value
    })
  }
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    const { username, email, password } = signupInfo

    if (!username || !email || !password) {
      return handleError('Fill all required fields')
    }

    try {
      const url = 'https://auth-project-yiln.onrender.com/api/auth/signup'

      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })

      const result = await response.json()
      const {success,message,error} = result

      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate('/login')
        },1000)
      }else if(!success){
        handleError(message)
      }
      else{
        handleError(result.error || result.message || "Something went wrong")
      }

    } catch (error) {
      handleError(error.message || 'SERVER ERROR')
    }
  }

  return (
    <div className='signup-container'>
      <div className='signup-card'>
        <h1 className='signup-title'>Create Account</h1>

        <form onSubmit={handleSubmit} className='signup-form'>

          <div className='form-group'>
            <label>Username</label>
            <input
              type="text"
              name='username'
              className='form-input'
              placeholder='Enter your username'
              autoFocus
              value={signupInfo.username}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input
              type="email"
              name='email'
              className='form-input'
              placeholder='Enter your email'
              value={signupInfo.email}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type="password"
              name='password'
              className='form-input'
              placeholder='Enter your password'
              value={signupInfo.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className='signup-btn'>Signup</button>

          <p className='signup-text'>
            Already have an account?
            <Link to='/login' className='signup-link'> Login</Link>
          </p>

        </form>

        <ToastContainer />
      </div>
    </div>
  )
}

export default Signup
