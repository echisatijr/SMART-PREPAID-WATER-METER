import React from 'react'
import './profile.css'
import { Avatar, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
function RechargeApp() {
  return (
    <section className='profile'>
      <div className='container'>
        <Typography variant='h1'>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        </Typography>
      </div>
    </section>
  )
}

export default RechargeApp
