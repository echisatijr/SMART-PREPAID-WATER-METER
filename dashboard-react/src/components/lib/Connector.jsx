import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import Monitor from '../dashboard/Monitor'

let receivedValue = null // Create a variable to store the received value

export function sendValue(newValue) {
  receivedValue = newValue // Update the received value
  console.log('Received value:', receivedValue)

  // Write data to the Firebase database
  firebase.database().ref('meter/token').set({ key: '90' })
  firebase.database().ref('meter/control').set({ key: receivedValue })
}

const Connector = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Attach a listener for real-time data updates
    const dataRef = firebase.database().ref('meter')
    dataRef.on('value', (snapshot) => {
      const newData = snapshot.val()
      setData(newData)
    })

    // Clean up the listener when component unmounts
    return () => {
      dataRef.off()
    }
  }, [])

  return <div>{data && <Monitor data={data} />}</div>
}

export default Connector
