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
  const { token, volume } = data || {}
  const tok = token && token.key
  const waterUsed = volume && volume.key
  console.log('volume data', data)

  const remainingWaterPercentage = calculateRemainingWaterPercentage(
    tok,
    waterUsed
  )
  console.log('The remaining water is ', remainingWaterPercentage, '%')

  const [values, setValues] = useState(() => {
    const storedValues = localStorage.getItem('notificationValues')
    return storedValues ? JSON.parse(storedValues) : []
  })

  const [remwater, setRemwater] = useState(() => {
    const storedRemwater = localStorage.getItem('remainingWater')
    return storedRemwater ? JSON.parse(storedRemwater) : []
  })

  const getConcatenatedArray = (values, remwater) => {
    let concatenatedArray = [...values, ...remwater]

    return concatenatedArray
  }

  useEffect(() => {
    if (
      remainingWaterPercentage &&
      ['50', '70', '90', '100'].includes(remainingWaterPercentage) &&
      !remwater.includes(remainingWaterPercentage)
    ) {
      const newRem = [...remwater, remainingWaterPercentage]
      setRemwater(newRem)
      localStorage.setItem('remainingWater', JSON.stringify(newRem))
    }
  }, [remainingWaterPercentage, remwater])

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
      localStorage.setItem('notificationValues', JSON.stringify(newValues))
    }
  }, [tok, values])

  const clearValues = () => {
    setValues([])
    setRemwater([])
    localStorage.removeItem('notificationValues')
    localStorage.removeItem('remainingWater')
  }

  const concatenatedArray = getConcatenatedArray(values, remwater)
  const concatenatedLength = concatenatedArray.length
  console.log(concatenatedLength)
  sendNotValue(concatenatedLength)

  return (
    <div className='noti'>
      <div className='container alert'>
        <div className='row notification' style={{ flexDirection: 'column' }}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            {values.map((value, index) => (
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
          <Stack sx={{ width: '100%', marginTop: 2 }} spacing={2}>
            {['50', '70', '90', '100'].includes(remainingWaterPercentage) && (
              <Alert
                className='alert-not'
                sx={{ fontSize: 12 }}
                severity='warning'
              >
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
