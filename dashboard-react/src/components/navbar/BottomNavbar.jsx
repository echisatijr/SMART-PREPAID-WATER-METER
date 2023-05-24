import React from 'react'
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import Grid from '@mui/material/Grid'
import './bottom.css'
export default function BottomNavbar() {
  const [value, setValue] = React.useState(0)

  return (
    <div className='bottom__nav'>
      <ul className='bottom_ul'>
        <li>
          <a href='#'>
            <Grid item xs={1} className='icon'>
              <SignalCellularAltIcon sx={{ fontSize: 20 }} />
            </Grid>
            Dashboard
          </a>
        </li>
        <li>
          <a href='#'>
            <Grid item xs={1} className='icon'>
              <PlaylistAddIcon sx={{ fontSize: 20 }} />
            </Grid>
            Recharge
          </a>
        </li>
        <li>
          <a href='#'>
            <Grid item xs={1} className='icon'>
              <NotificationsActiveIcon sx={{ fontSize: 20 }} />
            </Grid>
            Notifications
          </a>
        </li>
        <li>
          <a href='#'>
            <Grid item xs={1} className='icon'>
              <PersonOutlineIcon sx={{ fontSize: 20 }} />
            </Grid>
            Profile
          </a>
        </li>
      </ul>
    </div>
  )
}
