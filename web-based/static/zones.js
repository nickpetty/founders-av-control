"use strict";
// JS file for zones.html

window.onload = function() {
	setTimeout(function () {document.getElementsByTagName("html")[0].style.visibility = "visible";}, 1500);	
};

var bar = new VolumeControl('bar', 'Bar', changeVolume, muteVolume);
bar.place(100,16);
getVolume("Bar", function (rep) {
	var resp = rep.split("/", 2);
	bar.set(Number(resp[0]), Number(resp[1]));
});

var seating1 = new VolumeControl('seating1','Seating 1', changeVolume, muteVolume);
seating1.place(100,116);
getVolume("Seating1", function (rep) {
	var resp = rep.split("/", 2);
	seating1.set(Number(resp[0]), Number(resp[1]));
});

var seating2 = new VolumeControl('seating2', 'Seating 2', changeVolume, muteVolume);
seating2.place(100, 216);
getVolume("Seating2", function (rep) {
	var resp = rep.split("/", 2);
	seating2.set(Number(resp[0]), Number(resp[1]));
});

var elevator = new VolumeControl('elevator', 'Elevator', changeVolume, muteVolume);
elevator.place(100, 316);
getVolume("Elevator", function (rep) {
	var resp = rep.split("/", 2);
	elevator.set(Number(resp[0]), Number(resp[1]));
});

var harp = new VolumeControl('harp', 'Harp Bar', changeVolume, muteVolume);
harp.place(100, 416);
getVolume("Harp", function (rep) {
	var resp = rep.split("/", 2);
	harp.set(Number(resp[0]), Number(resp[1]));
});