import threading
import time
import requests
import random
from socketIO_client_nexus import SocketIO, LoggingNamespace
from datetime import datetime
with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
    def xuly():
        with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:
            socketIO.emit('statusdevice',"xuly")
            def on_aaa_response(*args):
                print(args[0][0]['status'])
            socketIO.on('statusdevice',on_aaa_response)
            socketIO.wait()
    def giamsat():
        while True:
           now = datetime.now()
           day = now.day
           nhietdo = random.randint(20, 30)
           doam = random.randint(60, 80)
           khigas = random.randint(0, 1)
           khico = random.randint(0, 1)
           khongkhi = random.randint(0, 1)
           socketIO.emit('insertdatasensor',{"day":day,"valueTemp":nhietdo,"valueHumidity":doam,"valueGas":khigas,"valueCO":khico,"valueAir":khongkhi})
##           socketIO.emit('datasensor',"testnew")
           socketIO.wait()
           print(nhietdo)
           print(doam)
           print(khigas)
           print(khico)
           print(khongkhi)
           time.sleep(10)
w = threading.Thread(target=xuly)
w2 = threading.Thread(target=giamsat)
w.start()
w2.start()
