import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { NavLink } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import './bottom.css'

const AppBarNav = () => {
  return (
    <section className='app-bar'>
      <Box sx={{ flexGrow: 1, padding: 1 }}>
        <AppBar className='nav-up' position='static'>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />

            <NavLink className='nav__items' to='/notification'>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={1} color='error'>
                  <NotificationsIcon fontSize='35px' />
                </Badge>
              </IconButton>
            </NavLink>
            <NavLink className='nav__items' to='/profile'>
              <IconButton
                size='large'
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge color='error'>
                  <PersonIcon fontSize='30px' />
                </Badge>
              </IconButton>
            </NavLink>
          </Toolbar>
        </AppBar>
      </Box>
    </section>
  )
}

export default AppBarNav
