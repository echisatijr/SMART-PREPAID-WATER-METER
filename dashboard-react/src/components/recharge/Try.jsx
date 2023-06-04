import React, { useState } from 'react'
import './recharge.css'
import { TextField } from '@mui/material'

const Try = () => {
  const [token, setToken] = useState('')
  const [previousToken, setPreviousToken] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    const { value } = event.target
    if (value.length <= 4 && /^\d*$/.test(value)) {
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
    if (token.length === 4 && /^\d*$/.test(token)) {
      // Check if the current token is the same as the previous token
      if (token === previousToken) {
        setError(true)
        setSuccess(false)
      } else {
        // Token is valid and not similar to the previous token
        console.log('Token submitted:', token)
        setToken('') // Clear the token input field
        setPreviousToken(token) // Store the current token as the previous token
        setSuccess(true) // Set success state to true
        setError(false) // Set error state to false
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
