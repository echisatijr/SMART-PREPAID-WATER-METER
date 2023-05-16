import serial
import requests
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
ser = serial.Serial('COM1', 9600) # Replace 'COM3' with the appropriate port name on your system

# ThingSpeak channel details
channel_id = '2137933'
write_api_key = 'KM46GR8219E7Z7ZL'

while True:
    # Read data from serial port
    data = ser.readline().strip().decode('utf-8')
    
    # Split data into totalMilliLitres and flowMilliLitres
    total_millilitres, flow_millilitres = map(int, data.split(','))
    
    # Send data to ThingSpeak
    url = 'https://api.thingspeak.com/update'
    params = {'api_key': write_api_key, 'field1': total_millilitres, 'field2': flow_millilitres}
    response = requests.post(url, params=params)
    
    print('Data sent to ThingSpeak:', total_millilitres, flow_millilitres)

    # Sending data to the firebase
w    # database.push({"meter/Volume":total_millilitres, "meter/flowRate":flow_millilitres})