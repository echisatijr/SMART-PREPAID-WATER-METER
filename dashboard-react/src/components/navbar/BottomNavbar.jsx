import React from 'react'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

import Grid from '@mui/material/Grid'
import './bottom.css'
import { NavLink } from 'react-router-dom'
export default function BottomNavbar() {
  return (
    <div className='bottom__nav'>
      <ul className='bottom_ul'>
        <li>
          <NavLink className='li__tag' to='/'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} />
            </Grid>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink className='li__tag' to='/recharge'>
            <Grid item xs={1} className='icon'>
              <PlaylistAddIcon sx={{ fontSize: 20 }} />
            </Grid>
            Recharge
          </NavLink>
        </li>
        <li>
          <NavLink className='li__tag' to='/control'>
            <Grid item xs={1} className='icon'>
              <NotificationsActiveIcon sx={{ fontSize: 20 }} />
            </Grid>
            Control
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
