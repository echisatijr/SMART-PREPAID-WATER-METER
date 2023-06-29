import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import Monitor from '../dashboard/Monitor'

let receivedValue = null
let receivedRecharge = null

export function sendValue(newValue) {
  receivedValue = newValue

  firebase.database().ref('meter/signal').set({ key: receivedValue })
}

export function sendRecharge(recharge) {
  receivedRecharge = recharge
  console.log('Recharged:', receivedRecharge)

  firebase.database().ref('meter/token').set({ key: receivedRecharge })
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
      <div>{data && <Monitor data={data} />}</div>
    </>
  )
}

export default Connector
