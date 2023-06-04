import { CardContent, Card, Typography, Box } from '@mui/material'

import React from 'react'
import Iframe from 'react-iframe'

const Monitor = ({ data }) => {
  const { total_consumption, flow_rate, current_volume } = data

  return (
    <Box>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
            <Card
              sx={{
                margin: 2,
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
                  }}
                >
                  The Total Water Bought : <span id='water-bought'></span>
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card
              sx={{
                margin: 2,
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
                  }}
                >
                  Total consumption :{' '}
                  {JSON.stringify(total_consumption, null, 2)}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card
              sx={{
                margin: 2,
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
                  }}
                >
                  Total Remaining water :{' '}
                  {JSON.stringify(current_volume, null, 2)}
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-md-3'>
            <Card
              sx={{
                margin: 2,
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
                  }}
                >
                  Current flow rate : {JSON.stringify(flow_rate, null, 2)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-6'>
            <Card
              sx={{
                margin: 2,
                backgroundColor: 'rgb(0, 33, 65);',
                color: '#fff',
              }}
            >
              <CardContent>
                <Typography
                  variant='h6'
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 20,
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
                    url='https://thingspeak.com/channels/2137933/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Total+Volume&type=line'
                    width='450'
                    height='270'
                    frameBorder='1'
                    styles={{ border: '2px solid #cccccc' }}
                  />
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className='col-md-6'>
            <Card
              sx={{
                margin: 2,
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
                    url='https://thingspeak.com/channels/2137933/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Flow+Rate&type=line'
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
