import React from 'react'
import '../combined.css'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import DashboardTabs from './DashboardTabs'

const Dashboard = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='dashboard-tabs'>
        <DashboardTabs />
      </div>
      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Dashboard
