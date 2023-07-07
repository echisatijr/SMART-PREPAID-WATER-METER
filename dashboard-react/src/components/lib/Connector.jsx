/*
-This component gets the data from firebase component and passes that data to the monitor.js component
-It recieves the value of token from recharge component and updates the firebase database
-It recieves the value from control component and updates the firebase database

*/

// imports
import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import Monitor from '../dashboard/Monitor'

let receivedValue = null
let receivedRecharge = null

// getting the signal that controls the valve and updating the database
export function sendValue(newSignalValue) {
  receivedValue = newSignalValue

  firebase.database().ref('meter/signal').set({ key: newSignalValue })
}

// getting the value of token and updating the database
export function sendRecharge(tokenValue) {
  receivedRecharge = tokenValue

  firebase.database().ref('meter/token').set({ key: tokenValue })
}

const Connector = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const dataRef = firebase.database().ref('meter')
    dataRef.on('value', (snapshot) => {
      const newData = snapshot.val()
      setData(newData)
    })

    return () => {
      dataRef.off()
    }
  }, [])

  return (
    <>
      {/* passing the data to the Monitor.js component */}
      <div>{data && <Monitor data={data} />}</div>
    </>
  )
}

export default Connector
