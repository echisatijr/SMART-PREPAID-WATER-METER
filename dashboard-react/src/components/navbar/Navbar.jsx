import React from 'react'
import Grid from '@mui/material/Grid'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import './navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='nav'>
      <NavLink to='/' className='brand'>
        {' '}
        Smart Water Prepaid Meter
      </NavLink>
      <ul className='nav__menu'>
        <li className='nav__items'>
          <NavLink to='/' className='nav__links'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} className='label' />
              dashboard
            </Grid>
          </NavLink>
        </li>
        <li className='nav__items'>
          <NavLink to='/recharge' className='nav__links'>
            <Grid item xs={1} className='icon'>
              {/* <PlaylistAddIcon sx={{ fontSize: 20 }} className='label' /> */}
              Recharge
            </Grid>
          </NavLink>
        </li>
        <li className='nav__items'>
          <NavLink to='/notifications'>
            <Grid item xs={1} className='icon'>
              {/* <NotificationsActiveIcon
                sx={{ fontSize: 20 }}
                className='label'
              /> */}
              Notifications
            </Grid>
          </NavLink>
        </li>
      </ul>
      <NavLink className='nav__items' to='/profile'>
        <Grid item xs={1} className='icon'>
          <PersonOutlineIcon sx={{ fontSize: 20 }} className='label' /> Profile
        </Grid>
      </NavLink>
    </nav>
  )
}

export default Navbar
