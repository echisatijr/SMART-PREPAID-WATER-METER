import React, { useState } from 'react'
import './recharge.css'
import { TextField } from '@mui/material'

import { sendRecharge } from '../lib/Connector'

const Try = () => {
  const [token, setToken] = useState('')
  const [previousToken, setPreviousToken] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { value } = event.target
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      // Check if the value contains only digits and at most one dot
      const dotCount = (value.match(/\./g) || []).length
      if (dotCount <= 1) {
        setToken(value)
        setError(false)
        setSuccess(false)
      } else {
        setError(true)
      }
    } else {
      setError(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (token !== '') {
      // Check if the token is not empty
      if (token !== previousToken) {
        setToken('')
        setPreviousToken(token)
        setSuccess(true)
        setError(false)
        let floatValue = parseFloat(token)

        sendRecharge(floatValue)

        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      } else {
        setError(true)
        setSuccess(false)
      }
    } else {
      setError(true)
    }
  }

  return (
    <section className='pay'>
      <form className='form-group' onSubmit={handleSubmit}>
        <div className='textfield'>
          <TextField
            sx={{
              width: '200px',
              '& .MuiInputBase-input': {
                fontSize: '10px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '10px',
              },
              '& .MuiInputLabel-root.MuiInputLabel-shrink': {
                fontSize: '1px',
              },
              backgroundColor: '#fff',
            }}
            error={error}
            helperText={error && !success ? 'Invalid token!!' : ''}
            placeholder='recharge number'
            value={token}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: 5 }} className='success-label'>
          {success && <p>You have successfully recharged</p>}
        </div>
        <div className='btn-field'>
          <button type='submit' className='btn btn-primary' id='submit-btn'>
            Recharge
          </button>
        </div>
      </form>
    </section>
  )
}

export default Try
