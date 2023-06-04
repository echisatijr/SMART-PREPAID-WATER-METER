import React from 'react'

import './app.css' // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Recharge from './components/recharge/Recharge'
import Notifications from './components/alert/Notifications'
import Profile from './components/profile/Profile'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/recharge' element={<Recharge />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/profile' element={<Profile />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App
