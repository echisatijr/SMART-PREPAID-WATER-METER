import React, { useState, useEffect } from 'react'
import './Notification.css'
import { Alert, Button, Stack } from '@mui/material'

import { sendNotValue } from '../lib/NotConnector'

const calculateRemainingWaterPercentage = (tok, watedUsed) => {
  const volume = watedUsed
  const remainingWaterPercentage = (volume / tok) * 100
  if (!isNaN(remainingWaterPercentage)) {
    return remainingWaterPercentage.toFixed(0)
  } else {
    console.log('value is NaN')
  }
}

const Notification = ({ data }) => {
  const { token, volume, remainingWater } = data || {}
  const tok = token && token.key

  const [values, setValues] = useState(() => {
    const storedValues = localStorage.getItem('notificationValues')
    return storedValues ? JSON.parse(storedValues) : []
  })

  const [remwater, setRemwater] = useState(() => {
    const storedRemainingWater = localStorage.getItem('remainingWater')
    return storedRemainingWater ? JSON.parse(storedRemainingWater) : []
  })

  const getConcatenatedArray = (values, remwater) => {
    let concatenatedArray = [...values, ...remwater]
    return concatenatedArray
  }

  useEffect(() => {
    if (remainingWater != undefined && remainingWater != null) {
      if (remainingWater >= 4.9 && remainingWater <= 5) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
      if (remainingWater >= 2.4 && remainingWater <= 2.5) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
      if (remainingWater >= 1.4 && remainingWater <= 1.5) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
      if (remainingWater >= 0.7 && remainingWater <= 0.8) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
      if (remainingWater >= 0.4 && remainingWater <= 0.5) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
      if (remainingWater == 0) {
        const remvalues = [...remwater, remainingWater]
        setRemwater(remvalues)
        localStorage.setItem('remainingWater', JSON.stringify(remvalues))
      }
    } else {
      console.log('remaining water is undefined or null')
    }
  }, [remainingWater])

  useEffect(() => {
    if (tok && !values.includes(tok)) {
      const newValues = [...values, tok]
      setValues(newValues)
      localStorage.setItem('notificationValues', JSON.stringify(newValues))
    }
  }, [tok, values])

  const clearValues = () => {
    setValues([])
    setRemwater([])
    localStorage.removeItem('notificationValues')
    localStorage.removeItem('remainingWater')
  }
  console.log('remaining water ', remwater)

  const concatenatedArray = getConcatenatedArray(values, remwater)
  const concatenatedLength = concatenatedArray.length
  console.log('from not', concatenatedLength)
  sendNotValue(concatenatedLength)

  console.log('remwater array:', remwater) // Log the remwater array

  return (
    <div className='noti'>
      <div className='container alert'>
        <div className='row notification' style={{ flexDirection: 'column' }}>
          <Stack sx={{ width: '100%', marginTop: 5 }} spacing={2}>
            {values
              .slice(0)
              .reverse()
              .map((value, index) => (
                <Alert
                  className='alert-not'
                  sx={{ fontSize: 12 }}
                  severity='success'
                  key={index}
                >
                  You have successfully purchased {value} mL
                </Alert>
              ))}
          </Stack>
          <Stack sx={{ width: '100%', marginTop: 5 }} spacing={2}>
            {remwater
              .slice(0)
              .reverse()
              .map((value, index) => (
                <Alert
                  className='alert-not'
                  sx={{ fontSize: 12 }}
                  severity='warning'
                  key={index}
                >
                  You are remaining with {value} L
                </Alert>
              ))}
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
