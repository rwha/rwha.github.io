'use strict';

var worker = new Worker('worker.js');

worker.onmessage = function(e){
	var returned = e.data;
	
	if(returned.command === 'list') {
		var t = document.getElementById('tiles');
		var frag = document.createDocumentFragment();
		Object.keys(returned.result).forEach(function(k){
			var p = document.createElement('div');
			p.textContent = returned.result[k];
			p.className = 'parent';
			p.setAttribute('id', k);
			frag.appendChild(p);
		});
		t.appendChild(frag);
		Array.prototype.forEach.call(t.childNodes, function(n){
			var nc = n;
			nc.addEventListener('click', function(e){
				e.stopPropagation();
				var s = document.querySelector('.selected');
				if(s) {
					s.className = 'parent'; 
				}
				this.className = 'selected';
				worker.postMessage({command: 'draw', curve: this.id});
			});
		});	
	} else if (returned.command === 'draw') {
		console.log(returned);
		var pathData = returned.result;
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,1000,1000);
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowBlur = 1;
		ctx.shadowColor = ctx.strokeStyle = 'red';
		ctx.moveTo(pathData[0][0], pathData[0][1]);
		pathData.forEach(function(v){
			//console.log(v);
			ctx.lineTo(v[0], v[1]);
		});
		ctx.stroke();
	} else {
		console.log(returned);
	}
}


window.onload = function() {
	worker.postMessage({command: 'list'});
}
