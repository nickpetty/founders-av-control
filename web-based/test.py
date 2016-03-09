from flask import Flask, render_template, Response
from bose import csp
from bss import Blu

#bose = csp('192.168.1.102')
#blu = Blu('192.168.1.20')

app = Flask(__name__)
level = 50

@app.route('/test/<value>')
def test(value):
	level = value

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
	print tvCh
	return Response(status=200)

@app.route('/api/setVol/<gainObject>/<value>')
def setvol(gainObject, value):

	print 'setting volume to ' + str(value) + ' for ' + str(gainObject)
	return Response(status=200)

@app.route('/api/getVol/<gainObject>')
def getVol(gainObject):
	state = 0
	print str(level) + "/" + str(state)
	return str(level) + "/" + str(state)

@app.route('/api/setMute/<gainObject>/<state>')
def setMute(gainObject, state):

	print 'set mute state to ' + str(state) + ' for ' + str(gainObject)
	return Response(status=200)


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=9191)