import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Recharge from './components/recharge/Recharge'
import Notifications from './components/alert/Notifications'
import Profile from './components/profile/Profile'
import Control from './components/dashboard/Control'
import { AppProvider } from './components/lib/AppState'
const App = () => {
  return (
    <AppProvider>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/recharge' element={<Recharge />} />
          <Route path='/control' element={<Control />} />
          <Route path='/notification' element={<Notifications />} />
          <Route path='/profile' element={<Profile />} />
          <Route />
        </Routes>
      </div>
    </AppProvider>
  )
}

export default App
