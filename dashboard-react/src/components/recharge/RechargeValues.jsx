import React from 'react'

const RechargeValues = ({ rechargeValues }) => {
  console.log('data from val', rechargeValues)
  return (
    <div>
      {rechargeValues.map((value, index) => (
        <p key={index}>Recharge value: {value}</p>
      ))}
    </div>
  )
}

export default RechargeValues
