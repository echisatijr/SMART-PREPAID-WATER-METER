import React from 'react'
import Grid from '@mui/material/Grid'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import './navbar.css'

function Navbar() {
  return (
    <nav className='nav'>
      <a href='#' className='brand'>
        {' '}
        Smart Water Prepaid Meter
      </a>
      <ul className='nav__menu'>
        <li className='nav__items'>
          <a href='#' className='nav__links'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} className='label' />
              dashboard
            </Grid>
          </a>
        </li>
        <li className='nav__items'>
          <a href='#' className='nav__links'>
            <Grid item xs={1} className='icon'>
              <PlaylistAddIcon sx={{ fontSize: 20 }} className='label' />
              Recharge
            </Grid>
          </a>
        </li>
        <li className='nav__items'>
          <a href='#'>
            <Grid item xs={1} className='icon'>
              <NotificationsActiveIcon
                sx={{ fontSize: 20 }}
                className='label'
              />
              Notifications
            </Grid>
          </a>
        </li>
      </ul>
      <a href='#'>
        <Grid item xs={1} className='icon'>
          <PersonOutlineIcon sx={{ fontSize: 20 }} className='label' /> Profile
        </Grid>
      </a>
    </nav>
  )
}

export default Navbar
