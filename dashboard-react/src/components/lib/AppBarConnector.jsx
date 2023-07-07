/*
This Component takes the values of database that are passed through firebase 
component  and passes them to AppBarNav component
 */

//imports
import React, { useEffect, useState } from 'react'
import firebase from './firebase'
import AppBarNav from '../navbar/AppBar'

const AppConnector = () => {
  const [data, setData] = useState(null)

  //useEffect such the everytime the any value in the firebase changes it should re-render
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
      {/* //passing the data from the database to the AppBarNav */}
      <AppBarNav data={data} />
    </div>
  )
}

export default AppConnector
