import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from './firebase'
import './login.css'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    if (event.target.id === 'username') {
      setUsername(event.target.value)
    } else if (event.target.id === 'password') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const fullUsername = `${username}@example.com`
      await firebase.auth().signInWithEmailAndPassword(fullUsername, password)
      console.log('Login successful')
      // Clear input fields
      setUsername('')
      setPassword('')
      // Call onLogin callback to update parent component state
      onLogin()
      // Navigate to the home page
      navigate('/')
    } catch (error) {
      console.error('Login error:', error.message)
      setError('Incorrect meter number or password')
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className='background'>
      <div className='shape'></div>
      <div className='shape'></div>
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        {error && <p className='error-message'>{error}</p>}
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
