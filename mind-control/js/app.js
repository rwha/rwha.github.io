console.log('loaded app.js.');

var start = document.getElementById('start-button');
var output = document.getElementById('output');

function logger(info) {
	var p = document.createElement('p');
	p.textContent = info;
	output.appendChild(p);
}

start.onclick = function() {
	logger('looking for bluetooth devices...');
	navigator.bluetooth.requestDevice({
		filters: [{
			services: ['0000110a-0000-1000-8000-00805f9b34fb']
		}]
	}).then(device => {
		logger('device found.');
		logger(JSON.stringify(device));
		console.log(device.name);
		console.log(device.paired);
		console.log(device.uuids);		
	}).catch(error => { 
		logger(error);
		console.log(error); 
	});
}

