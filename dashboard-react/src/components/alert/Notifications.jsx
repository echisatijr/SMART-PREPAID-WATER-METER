import React from 'react'
import BottomNavbar from '../navbar/BottomNavbar'
import Navbar from '../navbar/Navbar'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import '../combined.css'
import './Notification.css'
const Notification = () => {
  return (
    <div className='combined'>
      <div className='navbar-up'>
        <Navbar />
      </div>
      <div className='container alert'>
        <div className='row'>
          <Stack sx={{ width: '100%', marginTop: 6 }} spacing={2}>
            <Alert className='alert-not' severity='info'>
              You have used 50% of your water units
            </Alert>
            <Alert className='alert-not' severity='success'>
              You have successfully purchased 40 mL
            </Alert>
          </Stack>
        </div>
      </div>

      <div className='navbar-bottom'>
        <BottomNavbar />
      </div>
    </div>
  )
}

export default Notification
