var xDiv = document.getElementById('xdiv');
var yDiv = document.getElementById('ydiv');
var zDiv = document.getElementById('zdiv');


function motionEvent(e) {
	var x = e.accelerationIncludingGravity.x;
	var y = e.accelerationIncludingGravity.y;
	var z = e.accelerationIncludingGravity.z;
		
	xDiv.textContent = Math.floor(x);
	yDiv.textContent = Math.floor(y);
	zDiv.textContent = Math.floor(z);
}

function orientationEvent(e){
	var x = e.beta;
	var y = e.gamma;
	var z = e.alpha;
		
	xDiv.textContent = Math.floor(x);
	yDiv.textContent = Math.floor(y);
	zDiv.textContent = Math.floor(z);
}

window.addEventListener("deviceorientation", orientationEvent, true);
