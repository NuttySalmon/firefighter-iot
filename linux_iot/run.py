from aws_iot_client import AWSIOTClient
from sensor import Sensor
import time
from datetime import datetime
import threading
import json
from concurrent.futures import ProcessPoolExecutor as executor


class Config:
    def __init__(self, host, rootCA, cert, privkey, clientId, devices):
        self.host = host
        self.rootCA = rootCA
        self.cert = cert
        self.privkey = privkey
        self.clientId = clientId
        self.devices = devices

def connect_all(devices):
    for device in devices:
        thread = threading.Thread(target=connect, args=(device,))
        thread.run()

   
def connect(device):
    lock = device.lock
    if not lock.locked():
        with lock:
            if not device.connected:
                device.connect()

def publish(devices, client):
    while True:
        data = []
        for device in devices:
            data.append(device.get_data())            

        payload = {
            "clientId": client.config.clientId,  
            "datetime": datetime.now().strftime("%Y%m%d%H%M%S"),
            "status": "Deployed",
            "members": data
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
    
        connect_thread = threading.Thread(target=connect_all, args=(devices,))
        publish_thread = threading.Thread(target=publish, args=(devices, client))

        connect_thread.start()
        publish_thread.start()

    
    for t in threading.enumerate():
        if t is not threading.current_thread():
            t.join()

                       
if __name__ == '__main__':
	main()




