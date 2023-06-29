import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Recharge from './components/recharge/Recharge'
import Notifications from './components/alert/Notifications'
import Profile from './components/profile/Profile'
import Control from './components/dashboard/Control'
import { AppProvider } from './components/lib/AppState'
import LoginForm from './components/lib/LoginForm'
import NavBadge from './components/lib/NavBadge'
import './components/combined.css'
import BottomNavbar from './components/navbar/BottomNavbar'
import AppConnector from './components/lib/AppConnector'
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <AppProvider>
      {!loggedIn ? (
        <LoginForm path onLogin={handleLogin} />
      ) : (
        <div className='App'>
          <div className='navbar-up'>
            <NavBadge />
          </div>
          <div className='small-nav'>
            <AppConnector />
          </div>

          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/control' element={<Control />} />
            <Route path='/notification' element={<Notifications />} />
            <Route path='/profile' element={<Profile />} />
            <Route />
          </Routes>

          <div className='navbar-bottom'>
            <BottomNavbar />
          </div>
        </div>
      )}
    </AppProvider>
  )
}

export default App
