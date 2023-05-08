import serial
import requests

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
