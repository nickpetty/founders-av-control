import urllib2
import json

class DTV: 
	#http://stackoverflow.com/questions/6924519/error-when-parsing-json-data
	#Get JSON data from DTV STB
	def contact(self, n):
		url = n
		req = urllib2.urlopen(url)
		encoding = req.headers.get_content_charset()
		return json.loads(req.read().decode(encoding)) #res contains json data

	#Example of parsing
	def get_info(self, ip):
		res = self.contact('http://' + ip + ':8080/tv/getTuned')
		return(str(res['callsign']), str(res['major']), str(res['title']))

	def chng_chnl(self, ip, n):
		url = 'http://' + ip + ':8080/tv/tune?major=' + str(n)
		res = self.contact(url)
		return res['status']['msg']

	def keyInput(self, ip, n):
		url = 'http://' + ip + ":8080/remote/processKey?key=" + str(n)
		res = self.contact(url)

if __name__ == "__main__":

	if argv[1] == "info": # Sample: directv.py info 192.168.1.5
		print(DirecTV.get_info(argv[2]))

	if argv[1] == "channel": # Sample: directv.py channel 192.168.1.5 206
		print(chng_chnl(argv[2], argv[3]))