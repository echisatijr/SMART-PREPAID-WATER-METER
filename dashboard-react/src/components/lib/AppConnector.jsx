import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import AppBarNav from '../navbar/AppBar'

const AppConnector = ({ rechargeValues }) => {
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
      <AppBarNav data={data} rechargeValues={rechargeValues} />
    </div>
  )
}

export default AppConnector
