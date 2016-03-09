// JS file for music.html
window.onload = function() {
	setTimeout(function () {
		var html = document.getElementsByTagName("html")[0];
		html.style.background = "black";
		html.style.visibility = "visible";
	}, 1500);	
};

var ipod = new VolumeControl('ipod','iPod', changeVolume, muteVolume);
ipod.place(100,16);
getVolume("iPod", function (rep) {
	var resp = rep.split("/", 2);
	ipod.set(Number(resp[0]), Number(resp[1]));
});

var input = document.getElementById("channel");

function addText(i) {
	var current = input.value;
	input.value += i;
};

function submit() {
	dtv(input.value);
	input.value = '';
};

var clear = document.getElementById("clear");
clear.addEventListener("mousedown", function () {
	var input = document.getElementById("channel").value = '';
});

