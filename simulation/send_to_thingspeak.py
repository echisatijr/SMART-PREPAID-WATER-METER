import serial
import requests
import time

# ThingSpeak channel details
channel_id = '2137933'
write_api_key = 'KM46GR8219E7Z7ZL'

# Firebase Realtime Database details
firebase_url = 'https://proteus-data-default-rtdb.firebaseio.com/'
firebase_key = 'AIzaSyAJo32NZ-dDL0SXATwD9TzKCWmS0_1pW30'

# Set up serial port
ser = serial.Serial('COM1', 9600)  # Replace 'COM1' with the appropriate port name on your system
ser.write(b'10')
while True:
    # Read the results from the serial port
    data = ser.readline().strip().decode('utf-8')
    values = data.split(',')

    if len(values) >= 2:
        total_millilitres, flow_millilitres, current_volume = map(int, values[:3])
    else:
        print("Invalid data received from the serial port.")
        continue

    # Send data to ThingSpeak
    ts_url = f'https://api.thingspeak.com/update?api_key={write_api_key}&field1={total_millilitres}&field2={flow_millilitres}&field3={current_volume}'
    ts_response = requests.get(ts_url)

    # Create the data payload for Firebase
    firebase_data = {
        'total_millilitres': total_millilitres,
        'flow_millilitres': flow_millilitres,
        'current_volume': current_volume
    }

    # Send data to Firebase
    fb_url = f'{firebase_url}.json?auth={firebase_key}'
    fb_response = requests.patch(fb_url, json=firebase_data)

    if ts_response.status_code == 200 and fb_response.status_code == 200:
        print('Data sent to ThingSpeak and Firebase:', total_millilitres, flow_millilitres, current_volume)
    else:
        print('Failed to send data. ThingSpeak status:', ts_response.status_code, 'Firebase status:', fb_response.status_code)

    time.sleep(1)  # Wait for 1 second before reading the next data from the serial port





