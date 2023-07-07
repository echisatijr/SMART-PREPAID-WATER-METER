// displays the Monitor.js through the connector
import React from 'react'
import '../combined.css'
import Connector from '../lib/NotificationConnector'

const Dashboard = () => {
  return (
    <div className='combined'>
      <Connector />
    </div>
  )
}

export default Dashboard
