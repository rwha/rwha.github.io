'use strict';

var worker = new Worker('worker.js');

worker.onmessage = function(e){
	var returned = e.data;
	var canvas = document.getElementById('canvas');

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
				canvas.animate([{transform: 'translateX(0)'}, {transform: 'translateX(-120%)'}], {duration: 200, fill: 'forwards'});
				worker.postMessage({command: 'draw', curve: this.id});
			});
		});	
	} else if (returned.command === 'draw') {
		var pathData = returned.result;
		var ctx = canvas.getContext('2d');
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.shadowColor = ctx.strokeStyle = '#aaa';
		ctx.shadowBlur = 0;
		ctx.clearRect(0,0,1000,1000);
		ctx.beginPath();
		ctx.moveTo(500,0);
		ctx.lineTo(500,1000);
		ctx.moveTo(0,500);
		ctx.lineTo(1000,500);
		ctx.stroke();
		ctx.moveTo(pathData[0][0], pathData[0][1]);
		pathData.forEach(function(v){
			var t, s;
			var t = (v[0]>0 && v[0]<1000 && v[1]>0 && v[1]<1000);
			if(s || t) {
				ctx.lineTo(v[0], v[1]);
			} else {
				ctx.moveTo(v[0], v[1]);
			}
			s=t;
		});
		ctx.shadowBlur = 1;
		ctx.shadowColor = ctx.strokeStyle = 'red';
		ctx.stroke();
		canvas.animate([{transform: 'translateX(-120%)'}, {transform: 'translateX(0)'}], {duration: 200, fill: 'forwards'});
	} else {
		console.log(returned);
	}
}


window.onload = function() {
	worker.postMessage({command: 'list'});
}
