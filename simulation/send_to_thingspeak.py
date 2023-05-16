import serial
import requests
import time
# import pyrebase 



# config = {
#     "apiKey": "AIzaSyC_H_6B3wCiLmDcO8sJosRjitowHSvDfY8",
#     "authDomain": "smart-prepaid-water-meter.firebaseapp.com",
#     "databaseURL": "https://smart-prepaid-water-meter-default-rtdb.firebaseio.com",
#     "projectId": "smart-prepaid-water-meter",
#     "storageBucket": "smart-prepaid-water-meter.appspot.com",
#     "messagingSenderId": "97974428599",
#     "appId": "1:97974428599:web:62d111583ade730ff07e32",
#     "measurementId": "G-1TB2Y5W79B"
# }

# firebase = pyrebase.initiallise_app(config)
# database = firebase.database()
# Set up serial port
ser = serial.Serial('COM1', 9600)  # Replace 'COM1' with the appropriate port name on your system

# ThingSpeak channel details
channel_id = '2137933'
write_api_key = 'KM46GR8219E7Z7ZL'

# Write integer value 10 to the serial port
# ser.write(b'10')

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
    url = f'https://api.thingspeak.com/update?api_key={write_api_key}&field1={total_millilitres}&field2={flow_millilitres}&field3={current_volume}'
    response = requests.get(url)

    print('Data sent to ThingSpeak:', total_millilitres, flow_millilitres, current_volume)

    time.sleep(1)  # Wait for 1 second before reading the next data from the serial port
    # Sending data to the firebase
    # database.push({"meter/Volume":total_millilitres, "meter/flowRate":flow_millilitres})
