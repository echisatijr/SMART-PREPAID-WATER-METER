/*
This component represents the navigation bar of the application. It displays the brand name,
menu options with icons, and a notifications icon with a badge indicating the number of notifications.

The Navbar component imports various dependencies including React, Material-UI components,
and a CSS file for styling. It also imports the NavLink component from React Router for creating navigation links.

The component receives a `data` prop, which is destructured to access the `notification` property.
It also assigns a default value of 0 to `not` if `notification` or `notification.key` is undefined.

The component returns a JSX element representing the navigation bar. It consists of a navbar container,
brand name link, menu options, and the notifications icon.

Inline comments are added to explain specific sections of the code.
*/

import React from 'react'
import Grid from '@mui/material/Grid'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import NotificationsIcon from '@mui/icons-material/Notifications'
import './navbar.css'
import { NavLink } from 'react-router-dom'
import { Badge, IconButton } from '@mui/material'

function Navbar({ data }) {
  // Destructure the `notification` property from the `data` prop
  const { notification } = data || {}

  // Get the value of `notification.key`, or assign 0 if undefined
  const not = notification?.key ?? 0

  console.log('from navbar ', not)
  console.log('from nav ', not)

  return (
    <nav style={{}} className='nav'>
      {/* Brand name link */}
      <NavLink to='/' className='brand'>
        Smart Prepaid Water Meter
      </NavLink>

      {/* Menu options */}
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

      {/* Notifications icon */}
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
      </Grid>
    </nav>
  )
}

export default Navbar
