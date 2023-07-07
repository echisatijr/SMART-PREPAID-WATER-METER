/*
-This component returns 1 if the valve is open else 0
*/

import * as React from 'react'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { sendValue } from '../lib/Connector'
import BottomNavbar from '../navbar/BottomNavbar'
import '../combined.css'
import { AppContext } from '../lib/AppState'
export default function Control() {
  const { loading, setLoading } = React.useContext(AppContext) // used to keep the state CircularProgress

  const timerRef = React.useRef()

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current)
    },
    []
  )

  const handleClickLoading = () => {
    setLoading((prevLoading) => {
      const newValue = !prevLoading ? 1 : 0
      // Send the value to the server or perform any other action
      sendValue(newValue) // Call the sendValue function
      return !prevLoading
    })
  }
  return (
    <div className='combined'>
      <div className='dashboard-tabs'>
        <Box
          sx={{
            marginTop: 12,
            height: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // background: '#f6f923',
          }}
        >
          <Box
            sx={{
              width: 350,
              background: 'rgb(0, 33, 65);',
              borderRadius: 15,
            }}
          >
            <Box
              sx={{
                height: 200,
                marginTop: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center ',
              }}
            >
              <Fade
                in={loading}
                style={{
                  transitionDelay: loading ? '800ms' : '0ms',
                  width: 50,
                  color: '#fff',
                }}
                unmountOnExit
              >
                <CircularProgress />
              </Fade>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center ',
              }}
            >
              <Button
                onClick={handleClickLoading}
                sx={{
                  marginBottom: 10,
                  backgroundColor: '#fff',
                  width: 150,
                  fontSize: 16,
                  fontWeight: 600,
                }}
                className='btn'
              >
                {loading ? 'Stop Valve' : 'Open Valve'}
              </Button>
            </Box>
          </Box>
        </Box>
        <div className='navbar-bottom'>
          <BottomNavbar />
        </div>
      </div>
    </div>
  )
}
