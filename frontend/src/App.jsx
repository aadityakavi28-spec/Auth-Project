import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Home from './components/Home/Home'
import RefeshHandler from './components/RefreshHandler/RefeshHandler'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to='/login' />
  }

  return (
    <>
    <div className='App'>
      <RefeshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
      <Route path='/' element = {<Navigate to="/login" />} />

      <Route path='/login' element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
      <Route path='/signup' element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
      <Route path='/home' element = {<PrivateRoute element={<Home />} />} />
    </Routes>
    </div>
    </>
  )
}

export default App