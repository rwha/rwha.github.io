var xDiv = document.getElementById('xdiv');
var yDiv = document.getElementById('ydiv');
var zDiv = document.getElementById('zdiv');


function motionEvent(e) {
	var x = e.accelerationIncludingGravity.x;
	var y = e.accelerationIncludingGravity.y;
	var z = e.accelerationIncludingGravity.z;
		
	xDiv.textContent = x;
	yDiv.textContent = y;
	zDiv.textContent = z;
}

window.addEventListener("devicemotion", motionEvent, true);
