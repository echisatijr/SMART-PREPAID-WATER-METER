//renders the NotConnector
import React from 'react'
import '../combined.css'
import NotConnector from '../lib/NotificationConnector'
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
