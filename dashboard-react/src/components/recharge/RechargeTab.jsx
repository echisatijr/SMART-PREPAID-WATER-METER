import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const RechargeTab = () => {
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const { value } = event.target
    if (/^[01]{0,4}$/.test(value)) {
      setToken(value)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (/^[01]{4}$/.test(token)) {
      const parsedToken = parseInt(token, 2)
      if (parsedToken >= 0 && parsedToken <= 1) {
        // Token is valid, perform submission logic here
        console.log('Token submitted:', token)
      } else {
        setError(true)
      }
    } else {
      setError(true)
    }
  }

  return (
    <form className='form-div' onSubmit={handleSubmit}>
      <TextField
        error={error}
        helperText={
          error &&
          'Invalid token. Please enter a 4-digit number consisting of 0s and 1s.'
        }
        label='Enter Token'
        placeholder='Enter token'
        value={token}
        onChange={handleChange}
      />
      <Button type='submit' disabled={!token || error}>
        Submit
      </Button>
    </form>
  )
}

export default RechargeTab
