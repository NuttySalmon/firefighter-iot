from aws_iot_client import AWSIOTClient
from sensor import Sensor
import time
from datetime import datetime
import threading
import json
from concurrent.futures import ProcessPoolExecutor as executor
from random import random 

class Config:
    def __init__(self, host, rootCA, cert, privkey, clientId, devices):
        self.host = host
        self.rootCA = rootCA
        self.cert = cert
        self.privkey = privkey
        self.clientId = clientId
        self.devices = devices

def connect(device):
    lock = device.lock
    print("{} lock: {}".format(device.deviceId, lock.locked()))
    if not lock.locked():
        with lock:
            if not device.connected:
                print('Attempt to connect to {}'.format(device.deviceId), flush=True)
                device.connect()

def start_publish(devices, client):
    while True:
        data = []
        for device in devices:
            if not device.connected:
                t = threading.Thread(target=connect, args=(device,))
                t.start()
            try:
                data.append(device.get_data())            
            except Exception as e:
                device.disconnect()
                print(e)

        payload = {
            "clientId": client.config.clientId,  
            "datetime": datetime.now().replace(microsecond=0).isoformat(),
            "status": "Deployed",
            "members": data,
            "lat": 38.5818756 + random()/4000,
            "lng": -121.493181 + random()/4000
        }
        client.publish(payload) 
        time.sleep(1)
        

def main():
    config_json = open('./config.json')
    config = Config(**json.load(config_json))
    client = AWSIOTClient(config)
    devices = []
    
    for info in config.devices:
        device = Sensor(info['addr'], info['deviceId'])
        devices.append(device)
    
    start_publish(devices, client)

    for t in threading.enumerate():
        if t is not threading.current_thread():
            t.join()

                   
if __name__ == '__main__':
	main()




