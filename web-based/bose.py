
# Bose Control Space Device API
# http://worldwide.bose.com/pro/assets/pdf/products/controlspace/shared/tn_controlspace_serial_protocol_4.0_october_2013.pdf

import socket
import time

class csp:
	TCP_IP = None
	TCP_PORT = 10055

	def __init__(self, ip):
		self.TCP_IP = ip

	def send(self, msg, response=None):
		BUFFER = 1024
		self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
		self.sock.connect((self.TCP_IP, self.TCP_PORT))		
		self.sock.settimeout(2)
		self.sock.sendall(msg + '\r')
		data = self.sock.recv(BUFFER)
		self.sock.close()
		return data


	# Set functions:

	def setPreset(self, num):
		self.send('SS ' + str(num))		

	def setGainLevel(self, module, value):
		# -999.0dB to +12.0dB, 0.5dB step
		# might have to inverse the scale. (value + 60) * 2
		value = int(value) / 2 - 60
		self.send('SA"' + module + '">1=' + str(value))

	def setGainState(self, module, state):
		# States: T = Toggle | O = On(unmute) | F = Off(mute)
		self.send('SA"' + module + '">2=' + str(state))

	def setGroupLevel(self, group, value):
		# might have to inverse the scale. (value + 60) * 2
		self.send('SG' + str(group) + ',' + str(value))

	def setGroupState(self, group, state):
		self.send('SN' + str(group) + ',' + str(state))


	# Get functions:

	def getGroupState(self, group):
		state = self.send('GN' + str(group))[-2:][:-1]
		if state == 'M':
			return 'muted'
		if state == 'U':
			return 'unmuted'

	def getGroupLevel(self, group):
		#0-144 dec - -60db to +12
		value = int(self.send('GG' + str(group))[-3:], 16)
		value = (float(value) + 60) * 2
		return int(value)

	def getGainState(self, module):
		state = self.send('GA"' + module + '">2').split('=', 1)[1][:-2]
		if state == 'F':
			return 'muted'
		if state == 'O':
			return 'unmuted'		

	def getGainLevel(self, module):
		value = self.send('GA"' + module + '">1').split('=', 1)[1][:-2] 
		value = (float(value) + 60) * 2
		return int(value)


