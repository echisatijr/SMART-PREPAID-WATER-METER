import * as React from 'react'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { sendValue } from '../lib/Connector'

export default function Control() {
  const [loading, setLoading] = React.useState(false)
  // const [query, setQuery] = React.useState('idle')
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
      // console.log(newValue)
      return !prevLoading
    })
  }

  // const handleClickQuery = () => {
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current)
  //   }

  //   if (query !== 'idle') {
  //     setQuery('idle')
  //     return
  //   }

  //   setQuery('progress')
  //   timerRef.current = window.setTimeout(() => {
  //     setQuery('success')
  //   }, 2000)
  // }

  return (
    <Box
      sx={{
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
              backgroundColor: '#000',
              width: 150,
              fontSize: 13,
            }}
          >
            {loading ? 'Stop Valve' : 'Open Valve'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
