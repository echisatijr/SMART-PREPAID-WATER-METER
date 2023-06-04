import React from 'react'

const Monitor = ({ data }) => {
  const { total_consumption, flow_rate, current_volume } = data

  return (
    <div>
      <h2>Data from Firebase:</h2>
      <div>
        <h3>Total Consumption:</h3>
        <pre>{JSON.stringify(total_consumption, null, 2)}</pre>
      </div>
      <div>
        <h3>Flow Rate:</h3>
        <pre>{JSON.stringify(flow_rate, null, 2)}</pre>
      </div>
      <div>
        <h3>Current Volume:</h3>
        <pre>{JSON.stringify(current_volume, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Monitor
