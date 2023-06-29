import React from 'react'
import Grid from '@mui/material/Grid'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import NotificationsIcon from '@mui/icons-material/Notifications'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { Badge, IconButton } from '@mui/material'

function Navbar({ data }) {
  const { notification } = data || {}
  const not = notification?.key ?? 0
  console.log('from nav ', not)
  return (
    <nav style={{}} className='nav'>
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
          <IconButton
            size='large'
            aria-label='show 17 new notifications'
            color='inherit'
          >
            <Badge badgeContent={not} color='error'>
              <NotificationsIcon fontSize='35px' />
            </Badge>
          </IconButton>
        </NavLink>
        <NavLink className='nav__items icon-data' to='/profile'>
          <PersonOutlineIcon sx={{ fontSize: 30 }} className='label' />
        </NavLink>
      </Grid>
    </nav>
  )
}

export default Navbar
