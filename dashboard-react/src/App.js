import React from 'react'
import Navbar from './components/navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import BottomNavbar from './components/navbar/BottomNavbar'
import './app.css' // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div className='App'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <Dashboard />
      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default App
