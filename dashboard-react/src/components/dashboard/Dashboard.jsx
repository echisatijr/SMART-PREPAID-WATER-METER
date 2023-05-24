import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
const Dashboard = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <h2>This is the Dashboard component which is the home component</h2>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Dashboard
