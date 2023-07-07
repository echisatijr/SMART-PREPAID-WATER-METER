/*
This component represents a bottom navigation bar that displays icons and labels
for different sections of the application. It uses React Router to handle navigation.

The BottomNavbar component imports various icons from the Material-UI library and the Grid
component from MUI for layout purposes. It also imports a CSS file for styling and the NavLink
component from React Router for creating navigation links.

The component returns a JSX element representing the bottom navigation bar. It contains an unordered
list (ul) with list items (li) representing each navigation option. Each list item is wrapped in a
NavLink component to enable navigation to the specified route.

Inline comments are added to explain specific sections of the code.
*/

import React from 'react'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import SettingsIcon from '@mui/icons-material/Settings'
import Grid from '@mui/material/Grid'
import './bottom.css'
import { NavLink } from 'react-router-dom'

export default function BottomNavbar() {
  return (
    <div className='bottom__nav'>
      <ul className='bottom_ul'>
        {/* Dashboard navigation option */}
        <li>
          <NavLink className='li__tag' to='/'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} />
            </Grid>
            Dashboard
          </NavLink>
        </li>
        {/* Recharge navigation option */}
        <li>
          <NavLink className='li__tag' to='/recharge'>
            <Grid item xs={1} className='icon'>
              <PlaylistAddIcon sx={{ fontSize: 20 }} />
            </Grid>
            Recharge
          </NavLink>
        </li>
        {/* Control navigation option */}
        <li>
          <NavLink className='li__tag' to='/control'>
            <Grid item xs={1} className='icon'>
              <SettingsIcon sx={{ fontSize: 20 }} />
            </Grid>
            Control
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
