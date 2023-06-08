import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import Connector from '../lib/Connector'
import AppBarNav from '../navbar/AppBar'

const Dashboard = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='small-nav'>
        <AppBarNav />
      </div>
      <div className='dashboard-tabs'>
        <Connector />
      </div>
      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Dashboard
