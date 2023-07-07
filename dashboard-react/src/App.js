/*
This is the main entry point of the application. It sets up the routing for different components
and manages the login state of the user.

The App component imports various dependencies including React, React Router, and different components
of the application. It also imports CSS files and custom context providers.

The component uses the useState hook to manage the loggedIn state. If loggedIn is false, it renders
a login form. Otherwise, it renders the main application components.

The component returns JSX elements representing the application structure. It includes a login form,
navigation badges, navigation bars, and routes for different components.

Inline comments are added to explain specific sections of the code.
*/

import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Recharge from './components/recharge/Recharge'
import Notifications from './components/alert/Notifications'
import Control from './components/dashboard/Control'
import { AppProvider } from './components/lib/AppState'
import LoginForm from './components/lib/LoginForm'
import NavBadge from './components/lib/NavBadge'
import './components/combined.css'
import BottomNavbar from './components/navbar/BottomNavbar'
import AppConnector from './components/lib/AppBarConnector'

const App = () => {
  // State variable to manage login status
  const [loggedIn, setLoggedIn] = useState(false)

  // Function to handle login
  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <AppProvider>
      {/* Check if user is logged in */}
      {!loggedIn ? (
        // Render login form if not logged in
        <LoginForm path onLogin={handleLogin} />
      ) : (
        // Render main application components if logged in
        <div className='App'>
          <div className='navbar-up'>
            <NavBadge />
          </div>
          <div className='small-nav'>
            <AppConnector />
          </div>

          {/* Define routes for different components */}
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/recharge' element={<Recharge />} />
            <Route path='/control' element={<Control />} />
            <Route path='/notification' element={<Notifications />} />

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
