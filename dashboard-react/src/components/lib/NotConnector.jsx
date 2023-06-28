import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import Notification from '../alert/Notification'

export function sendValue(newValue) {
  firebase.database().ref('meter/signal').set({ key: newValue })
}

export function sendRecharge(recharge) {
  firebase.database().ref('meter/token').set({ key: recharge })
}

const Connector = ({ rechargeValues }) => {
  const [data, setData] = useState(null)
  console.log('from con', rechargeValues)
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
      <Notification data={data} rechargeValues={rechargeValues} />
    </div>
  )
}

export default Connector
