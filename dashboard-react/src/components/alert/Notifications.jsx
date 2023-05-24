import React from 'react'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import '../combined.css'
const Alert = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <h2>This is the Notification page</h2>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Alert
