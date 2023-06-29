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

  const getAlternatingArray = (values, remwater) => {
    const alternatingArray = []
    const maxLength = Math.max(values.length, remwater.length)

    for (let i = 0; i < maxLength; i++) {
      if (values[i]) {
        alternatingArray.push({ type: 'purchase', value: values[i] })
      }
      if (remwater[i]) {
        alternatingArray.push({ type: 'remaining', value: remwater[i] })
      }
    }

    return alternatingArray
  }

  useEffect(() => {
    if (remainingWater != undefined && remainingWater != null) {
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

  const alternatingArray = getAlternatingArray(values, remwater)
  console.log('alternatingArray:', alternatingArray)

  return (
    <div className='noti'>
      <div className='container alert'>
        <div className='row notification' style={{ flexDirection: 'column' }}>
          <Stack sx={{ width: '100%', marginTop: 5 }} spacing={2}>
            {alternatingArray
              .slice(0)
              .reverse()
              .map((item, index) => (
                <Alert
                  className='alert-not'
                  sx={{ fontSize: 12 }}
                  severity={item.type === 'purchase' ? 'success' : 'warning'}
                  key={index}
                >
                  {item.type === 'purchase'
                    ? `You have successfully purchased ${item.value} mL`
                    : `You are remaining with ${item.value} L`}
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
