import React, { useState } from 'react'
import './recharge.css'
import { TextField } from '@mui/material'
import OtherComponent from './OtherComponent'

const Try = () => {
  const [token, setToken] = useState('')
  const [previousToken, setPreviousToken] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { value } = event.target
    if (/^[01]{0,4}$/.test(value)) {
      setToken(value)
      setError(false)
      setSuccess(false)
    } else {
      setError(true)
      setSuccess(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (/^[01]{4}$/.test(token)) {
      // Check if the current token is the same as the previous token
      if (token === previousToken) {
        setError(true)
        setSuccess(false)
      } else {
        setToken('') // Clear the token input field
        setPreviousToken(token) // Store the current token as the previous token
        setSuccess(true) // Set success state to true
        setError(false) // Set error state to false
        let integerValue = parseInt(token, 2) // Convert token to an integer
        // Pass integerValue as a prop to OtherComponent
        console.log('integer value ', integerValue)
        ;<OtherComponent integerValue={integerValue} />
      }
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
            label='Enter Token'
            placeholder='Enter token'
            value={token}
            onChange={handleChange}
          />
        </div>
        <div className='success-label'>
          {success && <p>Token successfully entered</p>}
        </div>
        <div className='btn-field'>
          <button type='submit' className='btn btn-primary' id='submit-btn'>
            Submit Token
          </button>
        </div>
      </form>
    </section>
  )
}

export default Try
