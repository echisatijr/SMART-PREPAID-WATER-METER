import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import RechargeTab from './RechargeTab'
// import Try from './Try'
const Recharge = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div>
        <RechargeTab />
      </div>
      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Recharge
