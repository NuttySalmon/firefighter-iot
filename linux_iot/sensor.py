from bluepy.sensortag import SensorTag, KeypressDelegate
from random import uniform, randrange
from threading import Lock


class KeypressHandler(KeypressDelegate):
    def __init__(self):
        super().__init__()
        self.button = False

    def onButtonUp(self, but):
        if but == 0x01:  # right button
            self.button = False

    def onButtonDown(self, but):
        if but == 0x01:  # right button
            self.button = True


class Sensor:
    def __init__(self, addr, deviceId, mov_offset=2):
        self.addr = addr
        self.deviceId = deviceId
        self.device = None
        self.mov_offset = mov_offset
        self.connected = False
        self.button = False
        self.keypress_handle = KeypressHandler()
        self.lock = Lock()

    def connect(self):
        try:
            device = SensorTag(self.addr)
            device.barometer.enable()
            device.humidity.enable()
            device.accelerometer.enable()
            device.battery.enable()
            device.keypress.enable()
            device.setDelegate(self.keypress_handle)
            self.device = device
            self.connected = True
            return True
        except Exception:
            self.connected = False
            return False

    def disconnect(self):
        try:
            if self.connected is True:
                self.device.disconnect()
        finally:
            self.connected = False

    def get_data(self):
        data = {'deviceId': self.deviceId}
        if self.connected:
            temp, pres = self.get_temp_pres()
            try:
                sensor_data = {
                    'temp': temp,
                    'pres': pres,
                    'hum': self.get_hum(),
                    'mov': self.get_mov(),
                    'o2': self.get_o2(),
                    'hcn': self.get_hcn(),
                    'co': self.get_co(),
                    'battery': self.get_battery(),
                    'heart': self.get_heart(),
                    'button': self.get_button()
                }
                data.update(sensor_data)
            except Exception as e:
                self.disconnect()
                data['error']: e

        data['connected'] = self.connected
        return data

    def get_button(self):
        return self.keypress_handle.button

    def get_hum(self):
        temp, hum = self.device.humidity.read()
        return hum

    def get_mov(self):
        x_y_z = self.device.accelerometer.read()
        mov = 0
        for val in x_y_z:
            mov += abs(val)

        mov -= self.mov_offset
        return mov

    def get_heart(self):
        return randrange(110, 120)

    def get_o2(self):
        return 85

    def get_hcn(self):
        return uniform(68, 75)

    def get_co(self):
        return uniform(1270, 1300)

    def get_temp_pres(self):
        return self.device.barometer.read()

    def get_battery(self):
        return self.device.battery.read()
