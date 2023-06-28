import React, { useState } from 'react'
import './recharge.css'
import { TextField } from '@mui/material'
import OtherComponent from './OtherComponent'
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
    if (token !== previousToken) {
      setToken('')
      setPreviousToken(token)
      setSuccess(true)
      setError(false)
      let floatValue = parseFloat(token)
      console.log('float value: ', floatValue)
      ;<OtherComponent floatValue={floatValue} />
      sendRecharge(floatValue)

      setTimeout(() => {
        setSuccess(false)
      }, 2000)
    } else {
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <section className='pay'>
      <form className='form-group' onSubmit={handleSubmit}>
        <div className='textfield'>
          <TextField
            sx={{
              width: '240px',
              '& .MuiInputBase-input': {
                fontSize: '10px',
              },
              '& .MuiInputLabel-root': {
                fontSize: '15px',
              },
            }}
            error={error}
            helperText={error && !success ? 'Invalid token!!' : ''}
            label='Recharge'
            placeholder='Enter recharge number'
            value={token}
            onChange={handleChange}
          />
        </div>
        <div className='success-label'>
          {success && <p>You have successfully recharged</p>}
        </div>
        <div className='btn-field'>
          <button
            type='submit'
            className='btn btn-primary'
            id='submit-btn'
            disabled={!token}
          >
            Recharge
          </button>
        </div>
      </form>
      {/* <Notifications /> */}
    </section>
  )
}

export default Try
