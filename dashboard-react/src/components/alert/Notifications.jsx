import React from 'react'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import '../combined.css'
import AppBarNav from '../navbar/AppBar'
import NotConnector from '../lib/NotConnector'
const Notifications = ({ data }) => {
  console.log('notifaction ', data)
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='small-nav'>
        <AppBarNav />
      </div>
      <div className='container alert'>
        <NotConnector />
      </div>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Notifications
