import React from 'react'
import Grid from '@mui/material/Grid'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import './navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='nav'>
      <Link to='/' className='brand'>
        {' '}
        Smart Water Prepaid Meter
      </Link>
      <ul className='nav__menu'>
        <li className='nav__items'>
          <Link to='/' className='nav__links'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} className='label' />
              dashboard
            </Grid>
          </Link>
        </li>
        <li className='nav__items'>
          <Link to='/recharge' className='nav__links'>
            <Grid item xs={1} className='icon'>
              <PlaylistAddIcon sx={{ fontSize: 20 }} className='label' />
              Recharge
            </Grid>
          </Link>
        </li>
        <li className='nav__items'>
          <Link to='/notifications'>
            <Grid item xs={1} className='icon'>
              <NotificationsActiveIcon
                sx={{ fontSize: 20 }}
                className='label'
              />
              Notifications
            </Grid>
          </Link>
        </li>
      </ul>
      <Link to='/profile'>
        <Grid item xs={1} className='icon'>
          <PersonOutlineIcon sx={{ fontSize: 20 }} className='label' /> Profile
        </Grid>
      </Link>
    </nav>
  )
}

export default Navbar
