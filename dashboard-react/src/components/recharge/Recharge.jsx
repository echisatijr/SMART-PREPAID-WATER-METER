import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import RechargeTab from './RechargeTab'
import NavBadge from '../lib/NavBadge'
import AppConnector from '../lib/AppConnector'

const Recharge = () => {
  return (
    <div className='combined'>
      {/* <div className='small-nav'>
        <AppConnector />
      </div> */}
      <div>
        <RechargeTab />
      </div>
    </div>
  )
}

export default Recharge
