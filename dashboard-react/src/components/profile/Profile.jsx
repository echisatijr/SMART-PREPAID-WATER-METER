import React from 'react'

import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import AppBarNav from '../navbar/AppBar'
import RechargeApp from './RechargeApp'
const Profile = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='small-nav'>
        <AppBarNav />
      </div>
      <div className='recharge'>
        <RechargeApp />
      </div>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Profile
