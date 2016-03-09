// JS file for index.html
window.onload = function() {
	setTimeout(function () {document.getElementsByTagName("html")[0].style.visibility = "visible";}, 1500);	
};

var bluesville = new VolumeControl('bluesville', 'Bluesville', changeVolume, muteVolume);
bluesville.place(100,16);
getVolume("Bluesville", function (rep) {
	var resp = rep.split("/", 2);
	bluesville.set(Number(resp[0]), Number(resp[1]));
});

document.getElementById("bluesville").addEventListener("mousedown", function () {
	getVolume("Bluesville", function (rep) {
		var resp = rep.split("/", 2);
			bluesville.set(Number(resp[0]), Number(resp[1]));
		});
})

var music = new VolumeControl('music','Music', changeVolume, muteVolume);
music.place(100,116);
getVolume("Music", function (rep) {
	var resp = rep.split("/", 2);
	music.set(Number(resp[0]), Number(resp[1]));
});

var mic1 = new VolumeControl('mic1', 'Mic 1', changeVolume, muteVolume);
mic1.place(100, 216);
getVolume("Mic1", function (rep) {
	var resp = rep.split("/", 2);
	mic1.set(Number(resp[0]), Number(resp[1]));
});

var mic2 = new VolumeControl('mic2', 'Mic 2', changeVolume, muteVolume);
mic2.place(100, 316);
getVolume("Mic2", function (rep) {
	var resp = rep.split("/", 2);
	mic2.set(Number(resp[0]), Number(resp[1]));
});

var xlr = new VolumeControl('xlr', 'XLR', changeVolume, muteVolume);
xlr.place(100, 416);
getVolume("XLR", function (rep) {
	var resp = rep.split("/", 2);
	xlr.set(Number(resp[0]), Number(resp[1]));
});

var i = 0;
var e;
function timer () { e = setInterval(function () {
	if (i > 3) {
		i = 0;		
		clearInterval(timer);
		window.location.assign('/music');
	} else {
		i += 1;
	};
}, 400)};

var hiddenBtn = document.getElementById("hidden");
hiddenBtn.addEventListener("mousedown", function () {
	timer();
});

hiddenBtn.addEventListener("mouseup", function () {
	clearInterval(e);
});

function changeChannel (channel) {
	// send request to server with channel number
	console.log(channel);
};

