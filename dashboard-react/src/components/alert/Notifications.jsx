import React from 'react'
import BottomNavbar from '../navbar/BottomNavbar'
import '../combined.css'
import NotConnector from '../lib/NotConnector'

import AppConnector from '../lib/AppConnector'
import NavBadge from '../lib/NavBadge'
const Notifications = ({ data }) => {
  console.log('notifaction ', data)
  return (
    <div className='combined'>
      <div className='container alert'>
        <NotConnector />
      </div>
    </div>
  )
}

export default Notifications
