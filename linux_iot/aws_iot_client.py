from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import logging
import json

PORT = 8883

# Configure logging
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.INFO)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)


class AWSIOTClient:
    """Used to connect and publish to AWS IOT
    :param Config config: configuration for AWS IOT
    """

    def __init__(self, config):
        self.config = config
        self.MQTT_client = None
        self.connect()

    def connect(self):
        self.MQTT_client = AWSIoTMQTTClient(self.config.clientId)
        self.MQTT_client.configureEndpoint(self.config.host, PORT)
        self.MQTT_client.configureCredentials(
            self.config.rootCA, self.config.privkey, self.config.cert)

        # AWSIoTMQTTClient connection configuration
        self.MQTT_client.configureAutoReconnectBackoffTime(1, 32, 20)
        # Infinite offline Publish queueing
        self.MQTT_client.configureOfflinePublishQueueing(-1)
        self.MQTT_client.configureDrainingFrequency(2)  # Draining: 2 Hz
        self.MQTT_client.configureConnectDisconnectTimeout(10)  # 10 sec
        self.MQTT_client.configureMQTTOperationTimeout(5)  # 5 sec

        # Connect and subscribe to AWS IoT
        self.MQTT_client.connect()

    def publish(self, data, topic='firefighter/data'):
        """Publish to defined topic
        :param dict data: data to be published as json
        """
        payload_json = json.dumps(data)
        self.MQTT_client.publish(topic, payload_json, 1)
        logger.info('Published topic %s: %s\n', topic, payload_json)
