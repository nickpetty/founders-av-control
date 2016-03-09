starting raspberry pi touch screen as control panel
---------------------------------------------------

	auto login
	----------
		- edit /etc/inittab
		- comment '1:2345:respawn:/sbin/getty 115200 tty1'
		- add under '1:2345:respawn:/bin/login -f USERNAME tty1 </dev/tty1 >/dev/tty1 2>&1'

	start server and X
	------------------
		- crontab -e
		- @reboot screen -dm (detached mode) python ~/Desktop/electron-arm/web-based/main.py
		- @reboot startx[1]


[1] Setting X to boot single gui program
-------------------------------------

	- create .xinitrc in home (pi)
	- add line ~/Desktop/electron-arm/electron --disable-http-cache


Static IP
---------

	- sudo nano /etc/network/interfaces
	- add:
		iface eth0 inet static
		address <ip>
		netmask <nm>
		network <routerip>
		broadcast <ip.255>
		gateway <ip.254>
