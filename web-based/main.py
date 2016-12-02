from flask import Flask, render_template, Response
from bss import Blu
from directv import DTV

#blu = Blu('192.168.1.20')

app = Flask(__name__)
dtv = DTV()

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/music')
def music():
	return render_template('music.html')

@app.route('/zones')
def zones():
	return render_template('zones.html')

@app.route('/api/dtv/<tvCh>')
def api(tvCh):
	dtv.chng_chnl('192.168.1.50', tvCh)
	return Response(status=200)

@app.route('/api/setVol/<gainObject>/<value>')
def setvol(gainObject, value):
	objAry = {"bluesville":"000100/01F4", "music":"000100/0258", "mic1":"000100/012C", "mic2":"000100/0190", "xlr":"000100/0000", "ipod":"000100/00c8",
		"bar":"00010D/0000", "seating1":"00010E/0000", "seating2":"00010F/0000", "elevator":"000110/0000", "harp":"000111/0000"}
	blu.setPercent('10F4', '03', objAry[gainObject].split('/')[0], objAry[gainObject].split('/')[1], int(value))

	print 'setting volume to ' + str(value) + ' for ' + str(objAry[gainObject])
	return Response(status=200)

@app.route('/api/getVol/<gainObject>')
def getVol(gainObject):

	objAry = {"Bluesville":"000100/01f4/01f5",  "Music":"000100/0258/0259", "Mic1":"000100/012c/012d", "Mic2":"000100/0190/0191", "XLR":"000100/0000/0001", "iPod":"000100/00c8/00c9",
		"Bar":"00010D/0000/0001", "Seating1":"00010E/0000/0001", "Seating2":"00010F/0000/0001", "Elevator":"000110/0000/0001", "Harp":"000111/0000/0001"}

	level = blu.subscribePercent('10F4', '03', objAry[gainObject].split('/')[0], objAry[gainObject].split('/')[1]).next()
	state = blu.subscribeRaw('10F4', '03', objAry[gainObject].split('/')[0], objAry[gainObject].split('/')[2]).next()

	print str(level) + "/" + str(state)
	return str(level) + "/" + str(state)

@app.route('/api/setMute/<gainObject>/<state>')
def setMute(gainObject, state):

	objAry = {"bluesville":"000100/01F5", "music":"000100/0259", "mic1":"000100/012D", "mic2":"000100/0191", "xlr":"000100/0001", "ipod":"000100/00C9",
		"bar":"00010D/0001", "seating1":"00010E/0001", "seating2":"00010F/0001", "elevator":"000110/0001", "harp":"000111/0001"}
	blu.setState('10F4', '03', objAry[gainObject].split('/')[0], objAry[gainObject].split('/')[1], '0' + str(state))

	print 'set mute state to ' + str(state) + ' for ' + str(objAry[gainObject])
	return Response(status=200)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=9191)