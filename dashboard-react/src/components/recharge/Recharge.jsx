import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'

const Recharge = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <h2>This is the Recharge page</h2>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Recharge
