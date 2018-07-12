import threading
import time
import dht11
from socketIO_client_nexus import SocketIO, LoggingNamespace
from datetime import datetime
import RPi.GPIO as GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
instance = dht11.DHT11(pin=3)
GPIO.setup(17, GPIO.IN)
GPIO.setup(27, GPIO.IN)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(10, GPIO.IN)
with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
    def xuly():
        with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
            socketIO.emit('statusdevice',"xuly")
            def on_aaa_response(*args):
                status = args[0][0]['status'
            socketIO.on('statusdevice',on_aaa_response)
            socketIO.wait()
            if status == 0 :
               GPIO.output(22, GPIO.HIGH)
            else:
               GPIO.output(22, GPIO.LOW)
    def giamsat():
        while True:
               result = instance.read()
               if result.is_valid():
                   now = datetime.now()
                   day = now.day
                   nhietdo = result.temperature
                   doam = result.humidity
                   if GPIO.input(17) == 1:
                       khigas = 0
                   else:
                       khigas = 1
                   if GPIO.input(10) == 1:
                       khico = 0
                   else:
                       khico = 1
                   if GPIO.input(27) == 1:
                       khongkhi = 0
                   else:
                       khongkhi = 1
                   socketIO.emit('insertdatasensor',{"day":day,"valueTemp":nhietdo,"valueHumidity":doam,"valueGas":khigas,"valueCO":khico,"valueAir":khongkhi})
                   socketIO.wait()
                   time.sleep(10)
w = threading.Thread(target=xuly)
w2 = threading.Thread(target=giamsat)
w.start()
w2.start()

