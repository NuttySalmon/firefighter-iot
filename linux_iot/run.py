from aws_iot_client import AWSIOTClient
from sensor import Sensor
import json
class Config:
    def __init__(self, host, rootCA, cert, privkey, clientId, devices):
        self.host = host
        self.rootCA = rootCA
        self.cert = cert
        self.privkey = privkey
        self.clientId = clientId
        self.devices = devices


def main():
	config_json = open('./config.json')
	config = Config(**json.load(config_json))
	client = AWSIOTClient(config)
	client.publish({'message': 'test'})

if __name__ == '__main__':
	main()



