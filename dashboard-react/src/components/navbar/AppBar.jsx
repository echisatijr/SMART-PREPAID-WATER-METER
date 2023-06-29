import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { NavLink } from 'react-router-dom'
import './bottom.css'

const AppBarNav = ({ data }) => {
  const [not, setNot] = useState(0)

  useEffect(() => {
    if (data && data.notification && data.notification.key) {
      setNot(data.notification.key)
    } else {
      setNot(0)
    }
  }, [data])
  console.log('values from app', not)
  return (
    <section className='app-bar' style={{ zIndex: 0 }}>
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
                <Badge badgeContent={not} color='error'>
                  <NotificationsIcon fontSize='35px' />
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
