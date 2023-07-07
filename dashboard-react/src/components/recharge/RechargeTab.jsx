/*
This component represents a recharge form.
Users can enter a recharge token, and upon submission, the token is validated
against a predefined set of valid tokens. If the token is valid, a recharge
is performed and a success message is displayed. Otherwise, an error message
is shown.

The component uses React's useState hook to manage the state of the token,
previousToken, error, and success. It also imports the TextField component
from the Material-UI library for the input field.

The handleChange function is called whenever the value of the input field changes.
It validates the input value to ensure it contains only digits and at most one dot.
If the value is valid, it updates the token state and clears the error and success states.
Otherwise, it sets the error state to true.

The handleSubmit function is called when the form is submitted. It checks if the token
is not empty and matches one of the predefined valid tokens. If it matches, a recharge
is performed, the success state is set to true, and the token and previousToken states
are updated. If the token is invalid, the error state is set to true.

The form is rendered with an input field, error message (if applicable), success message
(if applicable), and a recharge button. The success message is displayed for a brief
period before disappearing.

The component exports the Try component as the default export.
*/

import React, { useState } from 'react'
import './recharge.css'
import { TextField } from '@mui/material'

import { sendRecharge } from '../lib/Connector'

const Try = () => {
  // State variables for token, previousToken, error, and success
  const [token, setToken] = useState('')
  const [previousToken, setPreviousToken] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // Function to handle changes in the input field
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

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    if (token !== '') {
      // Check if the token is not empty
      if (token !== previousToken) {
        if (token === '1202300100') {
          const value = 1
          setToken('')
          setPreviousToken(value)
          setSuccess(true)
          setError(false)
          let floatValue = parseFloat(value)

          sendRecharge(floatValue)
        } else if (token === '1202300050') {
          const value = 0.5
          setToken('')
          setPreviousToken(value)
          setSuccess(true)
          setError(false)
          let floatValue = parseFloat(value)

          sendRecharge(floatValue)
        } else if (token === '1202300280') {
          const value = 2.8
          setToken('')
          setPreviousToken(value)
          setSuccess(true)
          setError(false)
          let floatValue = parseFloat(value)

          sendRecharge(floatValue)
        } else if (token === '1202300516') {
          const value = 5.16
          setToken('')
          setPreviousToken(value)
          setSuccess(true)
          setError(false)
          let floatValue = parseFloat(value)

          sendRecharge(floatValue)
        } else if (token === '1202301000') {
          const value = 10
          setToken('')
          setPreviousToken(value)
          setSuccess(true)
          setError(false)
          let floatValue = parseFloat(value)

          sendRecharge(floatValue)
        } else {
          // Invalid token
          setError(true)
          setSuccess(false)
          return // Stop further execution of the function
        }

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
          {success && (
            <p style={{ color: '#fff' }}>You have successfully recharged</p>
          )}
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
