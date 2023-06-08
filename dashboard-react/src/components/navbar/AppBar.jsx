import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { NavLink } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'

const AppBarNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />

          <NavLink className='nav__items' to='/notification'>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </NavLink>
          <NavLink className='nav__items' to='/profile'>
            <IconButton
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'
            >
              <Badge badgeContent={17} color='error'>
                <PersonIcon />
              </Badge>
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarNav
