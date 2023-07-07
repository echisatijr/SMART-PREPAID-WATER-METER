/*
  gets the data from firebase.js  and passes it to the Notification component
*/

import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import Notification from '../alert/Notification'

export function sendValue(newSignal) {
  firebase.database().ref('meter/signal').set({ key: newSignal })
}

//gets the data from notification.js and updates the database
export function sendNotValue(notificationValue) {
  firebase.database().ref('meter/notification').set({ key: notificationValue })
}

export function sendRecharge(recharge) {
  firebase.database().ref('meter/token').set({ key: recharge })
}

const Connector = ({ rechargeValues }) => {
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
    <div>
      {/* sending the data from the database to the Notification component */}
      <Notification data={data} rechargeValues={rechargeValues} />
    </div>
  )
}

export default Connector
