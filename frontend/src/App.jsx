import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Home from './components/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  )

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"))
    }

    window.addEventListener("storage", checkAuth)

    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <div className='App'>
      <ToastContainer position="top-right" autoClose={1500} />

      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />

        <Route
          path='/login'
          element={
            isAuthenticated
              ? <Navigate to="/home" />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />

        <Route
          path='/signup'
          element={
            isAuthenticated
              ? <Navigate to="/home" />
              : <Signup />
          }
        />

        <Route
          path='/home'
          element={
            <PrivateRoute
              element={<Home setIsAuthenticated={setIsAuthenticated} />}
            />
          }
        />

      </Routes>
    </div>
  )
}

export default App