import React, { useState, useEffect } from 'react'
import './Notification.css'
import { Alert, Button, Stack } from '@mui/material'

const Notification = ({ data }) => {
  const { token, volume } = data || {} // Extract the token value from the data object
  const tok = token && token.key // Assign the token value to the 'tok' variable
  const volumeWater = volume && volume.key // Assign the token value to the 'tok' variable
  console.log('volume data', volume)

  const calculateRemainingWaterPercentage = (tok) => {
    // Assuming the total water capacity is 1000 mL

    const volume = 1.5
    const remainingWaterPercentage = (volume / tok) * 100
    if (remainingWaterPercentage != 'NaN') {
      return remainingWaterPercentage.toFixed(0) // Round the percentage to two decimal places
    } else {
      console.log('value is NaN')
    }
  }

  const remainingWaterPercentage = calculateRemainingWaterPercentage(tok)
  console.log('The remaining water is ', remainingWaterPercentage, '%')

  const [values, setValues] = useState(() => {
    // Retrieve the stored values from browser storage
    const storedValues = localStorage.getItem('notificationValues')
    return storedValues ? JSON.parse(storedValues) : []
  })

  const [remwater, setRemwater] = useState(() => {
    const storedRemwater = localStorage.getItem('remainingWater')
    return storedRemwater ? JSON.parse(storedRemwater) : []
  })

  useEffect(() => {
    if (
      remainingWaterPercentage &&
      !remwater.includes(remainingWaterPercentage)
    ) {
      const newRem = [...remwater, remainingWaterPercentage]
      setRemwater(newRem)

      localStorage.setItem('remainingWater', JSON.stringify(newRem))
    }
  })
  useEffect(() => {
    const newRem = localStorage.getItem('remainingWater')
    if (newRem) {
      setValues(JSON.parse(newRem))
    }
  }, [])
  useEffect(() => {
    if (tok && !values.includes(tok)) {
      const newValues = [...values, tok]
      setValues(newValues)
      // Store the updated values in browser storage
      localStorage.setItem('notificationValues', JSON.stringify(newValues))
    }
  }, [tok])

  useEffect(() => {
    const storedValues = localStorage.getItem('notificationValues')
    if (storedValues) {
      setValues(JSON.parse(storedValues))
    }
  }, [])

  const clearValues = () => {
    setValues([])
    setRemwater([])
    // Clear the stored values from browser storage
    localStorage.removeItem('notificationValues')
    localStorage.removeItem('remainingWater')
  }

  console.log('array not', values)
  console.log('array remwater', remwater)

  return (
    <div className='noti'>
      <div className='container alert'>
        <div
          className='row notification'
          style={{
            flexDirection: 'column', // Add this line to stack components vertically
          }}
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            {values.map((value, index) => (
              <Alert className='alert-not' severity='success' key={index}>
                You have successfully purchased {value} mL
              </Alert>
            ))}
          </Stack>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {['50', '70', '90', '100'].includes(remainingWaterPercentage) && (
              <Alert className='alert-not' severity='warning'>
                You have used {remainingWaterPercentage} % of your water units
              </Alert>
            )}
          </Stack>
        </div>
      </div>

      <div className='btn'>
        <Button className='notbtn' variant='contained' onClick={clearValues}>
          Clear All
        </Button>
      </div>
    </div>
  )
}

export default Notification
