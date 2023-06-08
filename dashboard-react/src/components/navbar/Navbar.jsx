import React from 'react'
import Grid from '@mui/material/Grid'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
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
            <Grid item xs={1}>
              Recharge
            </Grid>
          </NavLink>
        </li>
        <li className='nav__items'>
          <NavLink to='/control'>
            <Grid item xs={1}>
              Control
            </Grid>
          </NavLink>
        </li>
      </ul>
      <Grid item xs={2} className=' icon icon-data'>
        <NavLink className='nav__items' to='/notification'>
          <NotificationsActiveIcon sx={{ fontSize: 30 }} className='label' />
        </NavLink>
        <NavLink className='nav__items icon-data' to='/profile'>
          <PersonOutlineIcon sx={{ fontSize: 30 }} className='label' />
        </NavLink>
      </Grid>
    </nav>
  )
}

export default Navbar
