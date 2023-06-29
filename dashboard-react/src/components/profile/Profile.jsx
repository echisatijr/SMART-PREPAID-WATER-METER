import React from 'react'

import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import RechargeApp from './RechargeApp'
import AppConnector from '../lib/AppConnector'
const Profile = () => {
  return (
    <div className='combined'>
      {/* <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='small-nav'>
        <AppConnector />
      </div> */}
      <div className='recharge'>
        <RechargeApp />
      </div>

      {/* <div className='navbar-bottom'>
        <BottomNavbar />
      </div> */}
    </div>
  )
}

export default Profile
