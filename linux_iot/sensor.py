from bluepy.sensortag import SensorTag
from random import uniform, randrange
from bluepy.btle import BTLEDisconnectError
class Sensor:
    def __init__(self, addr, deviceId, mov_offset=2):
        self.addr = addr
        self.deviceId = deviceId
        self.device = None
        self.mov_offset = mov_offset
        self.connected = False

    def connect(self):
        try:
            device = SensorTag(self.addr)
            device.barometer.enable()
            device.humidity.enable()
            device.accelerometer.enable()
            device.battery.enable()
            self.device = device
            self.connected = True
            return True
        except BTLEDisconnectError:
            self.connected = False
            return False

    def disconnect(self):
        if self.connected == True:
            self.device.disconnect()
            self.connected = False

    def get_data(self):
        if self.connected:
            temp, pres = self.get_temp_pres()
            data = {
                'connected': True,
                'temp': temp,
                'pres': pres,
                'hum': self.get_hum(),
                'mov': self.get_mov(),
                'o2': self.get_o2(),
                'hcn': self.get_hcn(),
                'battery': self.get_battery(),
                'heart': self.get_heart()
            }
        else:
            data = { 'connected': False }
        return data
        
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
        return 9

    def get_hcn(self):
        return uniform(30, 75) 

    def get_co(self):
        return  uniform(800, 1300)

    def get_temp_pres(self):
        return self.device.barometer.read()

    def get_battery(self):
        return self.device.battery.read()

