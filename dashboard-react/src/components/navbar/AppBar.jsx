import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { NavLink } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person'
import './bottom.css'
import { Menu, MenuItem } from '@mui/material'

const AppBarNav = ({ data }) => {
  const { notification } = data || {}
  const not = notification?.key ?? 0 // Provide a default value of 0 if notification or notification.key is undefined
  console.log('from app', not)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
                <Badge badgeContent={not} color='error'>
                  <NotificationsIcon fontSize='35px' />
                </Badge>
              </IconButton>
            </NavLink>
            <a
              className='nav__items'
              aria-label='show menu'
              color='inherit'
              style={{
                padding: 20,
              }}
              onClick={handleMenuOpen}
            >
              <Badge color='error'>
                <PersonIcon fontSize='30px' />
              </Badge>
            </a>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                sx={{
                  backgroundColor: 'rgb(0, 33, 65)',
                }}
                onClick={handleMenuClose}
              >
                Log Out
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </section>
  )
}

export default AppBarNav
