import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'

import Connector from '../lib/Connector'
import NavBadge from '../lib/NavBadge'
import AppConnector from '../lib/AppConnector'

const Dashboard = () => {
  return (
    <div className='combined'>
      <Connector />
    </div>
  )
}

export default Dashboard
