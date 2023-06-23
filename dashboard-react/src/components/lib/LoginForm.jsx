import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    if (event.target.id === 'username') {
      setUsername(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Perform login logic here
    console.log('Username:', username)
    console.log('Password:', password)
    // Clear input fields
    setUsername('')
    setPassword('')
    // Call onLogin callback to update parent component state
    onLogin()
    // Navigate to the home page
    navigate('/')
  }

  return (
    <div className='background'>
      <div className='shape'></div>
      <div className='shape'></div>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <label htmlFor='username'>Meter Number</label>
        <input
          type='text'
          placeholder='Enter Meter Number'
          id='username'
          value={username}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={handleChange}
        />

        <button type='submit'>Sign In</button>
      </form>
    </div>
  )
}

export default LoginForm
