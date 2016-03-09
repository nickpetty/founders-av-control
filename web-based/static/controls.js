"use strict";

function VolumeControl(header, divTag, gainObject, callback, muteCallback, maxValue) {
	this.name = divTag;
	var val;
	var muteEngage = 1;
	maxValue = maxValue || 100;
	var timer;
	//var onHold = function (cb) {setInterval(function (cb) {cb; document.getElementById(divTag+"Bar").value = val;}, 70); };

	function onHoldUp() {timer = setInterval(function () {callback(gainObject, val+=1); document.getElementById(divTag+"Bar").value = val;}, 70);};
	function onHoldDown() {timer = setInterval(function () {callback(gainObject, val-=1); document.getElementById(divTag+"Bar").value = val;}, 70);};

	this.set = function (value, muteState) {
		val = value;
		document.getElementById(divTag+"Bar").value = val;
		var muteBtn = document.getElementById(divTag+"Mute");
		if (muteState == 1) {
			var muteEngage = 1;
			muteBtn.click();
		};
	};

	this.get = function () {
		console.log(this.name + ': ' + this.val);
	};

	this.place = function (x,y) {
		var control = document.getElementById(this.name);
		
		// Create UP Button
		var upBtn = document.createElement("img");
			upBtn.setAttribute("id", divTag+"Up");
			//upBtn.setAttribute("draggable", "false");      
		// var title = document.createTextNode("Up");       
		// 	upBtn.appendChild(title);
		control.appendChild(upBtn);

		// Pos UP Button
		var upDiv = document.getElementById(divTag+"Up");
			upDiv.src = "/static/img/up.png";
			upDiv.style.position = "relative";
			upDiv.style.width = '50px';
			upDiv.style.top = '25px';
			upDiv.style.left = '5px';

		// Create DOWN Button
		var downBtn = document.createElement("img"); 
			downBtn.setAttribute("id", divTag+"Down"); 
			//downBtn.setAttribute("draggable", "false");      
		// var title = document.createTextNode("Down");       
		// 	downBtn.appendChild(title);   
		control.appendChild(downBtn);

		// Pos DOWN Button
		var downDiv = document.getElementById(divTag+"Down");
			downDiv.src = "/static/img/down.png";
			downDiv.style.width = '50px';
			downDiv.style.position = "relative";
			downDiv.style.top = '23px';
			downDiv.style.left = '5px';

		// Progress Bar
		var progressBar = document.createElement("PROGRESS");
			progressBar.setAttribute("id", divTag+"Bar");
			progressBar.setAttribute("value", "0");
			progressBar.setAttribute("min", "0");
			progressBar.setAttribute("max", maxValue);	
			progressBar.style.cssText = "position: relative; top: -42px; left: 22px; width:100px; height:14px; border:1; border-radius:9px; -webkit-transform: rotate(-90deg);";
		control.appendChild(progressBar);

		// Mute Button
		var muteButton = document.createElement("img");
			muteButton.setAttribute("id", divTag+"Mute");
		control.appendChild(muteButton);

		var muteDiv = document.getElementById(divTag+"Mute");
			muteDiv.src = "/static/img/unmute.png";		
			muteDiv.style.position = "relative";
			muteDiv.style.top = "1px";
			muteDiv.style.left = "30px";
			muteDiv.style.width = "30px";
		
		// Title
		var label = document.createElement("LABEL");
			label.setAttribute("id", divTag+"Title");
		var text = document.createTextNode(header);
			label.appendChild(text);
		control.appendChild(label);

		var labelDiv = document.getElementById(divTag+"Title");

			labelDiv.style.position = "absolute";
			labelDiv.style.textAlign = "center";			
			labelDiv.style.top = "3px";
			labelDiv.style.left = "8px";
			labelDiv.style.fontWeight = "bold";

		// Pos Controls
		control.style.position = "absolute";
		control.style.top = x+'px';
		control.style.left = y+'px';
		control.style.width = "90px";
		control.style.height = "160px";
		control.style.backgroundColor = "#ffefb3";
		control.style.border = "thick solid #000000";
		control.style.borderRadius = "9px";
		control.style.zoom = "1.3";
		control.addEventListener("drop", function(){clearInterval(onHoldDown);});
		control.addEventListener("drop", function(){clearInterval(onHoldUp);});

		listen(callback);
	};

	var listen = function () {
		// Event Listeners
		//var onHoldDown;
		var downDiv = document.getElementById(divTag+"Down");	
		downDiv.addEventListener("mousedown", function () {
			document.getElementById(divTag+"Bar").value = val;
			var muteBtn = document.getElementById(divTag+"Mute");
			if (muteEngage == 0) {
				muteBtn.click();
			};
			
			onHoldDown = setInterval(function () {callback(gainObject, val-=1); document.getElementById(divTag+"Bar").value = val;}, 70);
		});
		downDiv.addEventListener("mouseup", function () {
			console.log('mouse up');
			clearInterval(onHoldDown);
		});
		downDiv.addEventListener("dragend", function () {
			console.log('drag ended');
			clearInterval(onHoldDown);
		});

		//var onHoldUp;
		var upDiv = document.getElementById(divTag+"Up");		
		upDiv.addEventListener("mousedown", function () {
			document.getElementById(divTag+"Bar").value = val;
			var muteBtn = document.getElementById(divTag+"Mute");
			if (muteEngage == 0) {
				muteBtn.click();
			};		
			onHoldUp = setInterval(function () {callback(gainObject, val+=1); document.getElementById(divTag+"Bar").value = val;}, 70);
		});
		upDiv.addEventListener("mouseup", function () {
			console.log('mouse up')
			clearInterval(onHoldUp);
		});	
		upDiv.addEventListener("dragstart", function(e) {
			var dragImgEl = document.createElement('span');
			dragImgEl.setAttribute('style', 'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;' );
			document.body.appendChild(dragImgEl);
			e.dataTransfer.setDragImage(dragImgEl, 0, 0);
		});		
		upDiv.addEventListener("dragend", function () {
			console.log('drag ended');
			clearInterval(onHoldUp);
		});


		var muteDiv = document.getElementById(divTag+"Mute");
		muteDiv.addEventListener("click", function () {
			if (muteEngage == 1) { // unmute
				document.getElementById(divTag+"Bar").value = val;
				var btn = document.getElementById(divTag+"Mute");
				btn.src = "/static/img/unmute.png";
				muteCallback(0);
				muteEngage = 1;
				console.log(divTag+"Mute" + ': unmuted');
			}
			else
			if (muteEngage == 1) { // mute
				document.getElementById(divTag+"Bar").value = 0;
				var btn = document.getElementById(divTag+"Mute");
				btn.src = "/static/img/mute.png";
				muteCallback(1);
				muteEngage = 0;
				console.log(divTag+"Mute" + ': muted');
			};

		});

	};
};

// class Source Selection

// matrix of buttons with commands pass in dict