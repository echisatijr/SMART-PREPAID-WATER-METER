import React, { useState, useEffect } from 'react'
import './Notification.css'
import { Alert, Button, Stack } from '@mui/material'

const Notification = ({ data }) => {
  const { token } = data || {} // Extract the token value from the data object
  const tok = token && token.key // Assign the token value to the 'tok' variable

  const [values, setValues] = useState(() => {
    // Retrieve the stored values from browser storage
    const storedValues = localStorage.getItem('notificationValues')
    return storedValues ? JSON.parse(storedValues) : []
  })

  useEffect(() => {
    if (tok) {
      const newValues = [...values, tok]
      setValues(newValues)
      // Store the updated values in browser storage
      localStorage.setItem('notificationValues', JSON.stringify(newValues))
    }
  }, [tok])

  console.log('array not', values)

  return (
    <div className='noti'>
      <div className='container alert'>
        <div className='row notification'>
          <Stack sx={{ width: '80%', marginTop: 6 }} spacing={2}>
            {values.map((value, index) => (
              <Alert className='alert-not' severity='success' key={index}>
                You have successfully purchased {value} mL
              </Alert>
            ))}
          </Stack>
        </div>
      </div>

      <div className='btn'>
        <Button
          className='notbtn'
          variant='contained'
          onClick={() => {
            setValues([])
            // Clear the stored values from browser storage
            localStorage.removeItem('notificationValues')
          }}
        >
          Clear All
        </Button>
      </div>
    </div>
  )
}

export default Notification
