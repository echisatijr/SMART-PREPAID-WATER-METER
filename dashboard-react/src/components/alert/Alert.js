import React from 'react'

const Notification = ({ data }) => {
  console.log('Notification data:', data)

  return (
    <div>
      <h1 style={{ color: 'white', fontSize: 50 }}>
        This is the notifications page
      </h1>
    </div>
  )
}

export default Notification
