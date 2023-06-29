import { CardContent, Card, Typography, Box } from '@mui/material'

import React from 'react'
import Iframe from 'react-iframe'
import './Monitor.css'
const Monitor = ({ data }) => {
  const { flowRate, volume, token, remainingWater } = data

  return (
    <Box
      sx={{
        marginTop: 6,
        '@media (max-width:600px)': {
          marginTop: 1,
        },
      }}
    >
      <div className='container'>
        <div className='row  data'>
          <div className='col-3 data_col'>
            <Card
              sx={{
                '@media (max-width:600px)': {
                  width: '95%',
                },
                margin: 1,
                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                  }}
                >
                  Water purchased : {token.key}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-3'>
            <Card
              sx={{
                '@media (max-width:600px)': {
                  width: '95%',
                },
                margin: 1,
                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                  }}
                >
                  Water used : {volume}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-3'>
            <Card
              sx={{
                '@media (max-width:600px)': {
                  width: '90%',
                },
                margin: 1,
                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                  }}
                >
                  Remaining water : {remainingWater}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-3'>
            <Card
              sx={{
                '@media (max-width:600px)': {
                  width: '85%',
                },

                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                  }}
                >
                  flow rate : {flowRate}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='row things'>
          <div className='col-md-6'>
            <Card
              sx={{
                margin: 1,
                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  variant='h5'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Total Volume
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  gutterBottom
                  component='div'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Iframe
                    url='https://thingspeak.com/channels/2146181/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15'
                    width='450'
                    height='270'
                    frameBorder='1'
                    styles={{ border: '2px solid #cccccc' }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-md-6 '>
            <Card
              sx={{
                margin: 1,
                backgroundColor: 'rgb(0, 33, 65)',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
                    '@media (max-width:600px)': {
                      fontSize: 10,
                    },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  Flow Rate
                </Typography>
              </CardContent>
              <CardContent>
                <Typography
                  gutterBottom
                  component='div'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Iframe
                    url='https://thingspeak.com/channels/2146181/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Water+Flow&type=line'
                    width='450'
                    height='270'
                    frameBorder='1'
                    styles={{
                      border: '2px solid #cccccc',
                    }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Box>
  )
}

export default Monitor
