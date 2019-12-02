from aws_iot_client import AWSIOTClient, Config
import json

def main():
	config_json = open('./config.json')
	config = Config(**json.load(config_json))
	client = AWSIOTClient(config)
	client.publish({'message': 'test'})

if __name__ == '__main__':
	main()



