Setting up SD Card
------------------
Image:
	-http://downloads.raspberrypi.org/raspbian/images/raspbian-2016-11-29/2016-11-25-raspbian-jessie.zip

Install Guide:
	-https://www.raspberrypi.org/documentation/installation/installing-images/README.md

Version: `2016-11-25-raspbian-jessie-lite`


Setting up Raspberry Pi
-----------------------

Login: 
	`User: 'pi'`
	`Password: 'raspberry'`

```
sudo apt-get update
sudo apt-get upgrade
# sudo apt-get dist-upgrade
sudo apt-get install raspberrypi-ui-mods
# sudo apt-get install raspberrypi-net-mods
```

Rotate Screen:
	`sudo nano /boot/config.txt`

Add line:
	`lcd_rotate=2`

Change Keyboard Layout (second comment):
	`https://www.raspberrypi.org/forums/viewtopic.php?f=28&t=80127`

Enable SSH:
	`http://www.raspberrypi-spy.co.uk/2012/05/enable-secure-shell-ssh-on-your-raspberry-pi/`



Setting up Electron and Control Software
----------------------------------------

`https://www.fyears.org/2015/06/electron-as-gui-of-python-apps.html`

```
sudo apt-get install npm
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
sudo npm install electron-prebuilt -g

[In home directory (cd ~)]
wget https://github.com/nickpetty/founders-av-control/archive/master.zip
unzip master.zip
cd founders-av-control-master/electron

sudo npm install request
sudo npm install request-promise

sudo apt-get install python-pip
sudo pip install flask

sudo apt-get install libxss1 libnss3

sudo apt-get install --no-install-recommends xserver-xorg (may be install already)
sudo apt-get install --no-install-recommends xinit
```



Starting raspberry pi touch screen as control panel
---------------------------------------------------

	auto login
	----------
		- ~edit /etc/inittab~
		- ~comment '1:2345:respawn:/sbin/getty 115200 tty1'~
		- ~add under '1:2345:respawn:/bin/login -f USERNAME tty1 </dev/tty1 >/dev/tty1 2>&1'~
		- http://raspberrypi.stackexchange.com/questions/48241/auto-login-in-jessie-how


	start server and X
	------------------
		- crontab -e
		- ~@reboot screen -dm (detached mode) python ~/Desktop/electron-arm/web-based/main.py~
		- @reboot startx[1]



[1] Setting X to boot single gui program
----------------------------------------

	- create .xinitrc in home (pi)
	- add line electron ~/Desktop/founders-av-control-master/electron/ 



Static IP
---------

	- sudo nano /etc/network/interfaces
	- add:
		iface eth0 inet static
		address 192.168.1.100
		netmask 255.255.255.0
		network 192.168.1.1
		broadcast 192.168.1.255
		gateway 192.168.1.254
