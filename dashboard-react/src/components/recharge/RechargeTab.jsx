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
    setToken(value)
    setError(false)
    setSuccess(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (token !== previousToken) {
      setToken('') // Clear the token input field
      setPreviousToken(token) // Store the current token as the previous token
      setSuccess(true) // Set success state to true
      setError(false) // Set error state to false
      let integerValue = parseFloat(token) // Convert token to an integer
      // Pass integerValue as a prop to OtherComponent
      console.log('integer value ', integerValue)
      ;<OtherComponent integerValue={integerValue} />
      sendRecharge(integerValue)
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
          <button type='submit' className='btn btn-primary' id='submit-btn'>
            Recharge
          </button>
        </div>
      </form>
    </section>
  )
}

export default Try
